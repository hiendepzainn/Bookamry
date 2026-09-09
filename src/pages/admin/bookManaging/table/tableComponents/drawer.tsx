import { formatDate, formatPrice } from "@/services/helpers";
import { Badge, Descriptions, Divider, Drawer, Image, Upload } from "antd";
import type { DescriptionsProps, UploadFile } from "antd";
import { useState } from "react";

interface IProps {
  dataDrawer: IBookTable;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (value: boolean) => void;
}

const BookDrawer = (props: IProps) => {
  const { dataDrawer, isDrawerOpen, setIsDrawerOpen } = props;

  const [urlPreview, setUrlPreview] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "ID",
      children: dataDrawer._id,
    },
    {
      key: "2",
      label: "Tên sách",
      children: dataDrawer.mainText,
    },
    {
      key: "3",
      label: "Tác giả",
      children: dataDrawer.author,
    },
    {
      key: "4",
      label: "Giá tiền",
      children: formatPrice(dataDrawer.price),
    },
    {
      key: "5",
      label: "Thể loại",
      children: <Badge status="processing" text={dataDrawer.category} />,
      span: 2,
    },
    {
      key: "6",
      label: "Created At",
      children:
        dataDrawer.createdAt === "" ? "" : formatDate(dataDrawer.createdAt),
    },
    {
      key: "7",
      label: "Updated At",
      children:
        dataDrawer.updatedAt === "" ? "" : formatDate(dataDrawer.updatedAt),
    },
  ];

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://lienquan.garena.vn/wp-content/uploads/2024/05/51308-1.jpg",
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url: "https://lienquan.garena.vn/wp-content/uploads/2024/05/8399a533ce456d906e0730213ae8b5d7659683c0dec671.jpg",
    },
  ]);

  const previewFile = (file: UploadFile) => {
    if (file.url) {
      setUrlPreview(file.url);
      setIsPreviewOpen(true);
    }
  };

  return (
    <Drawer
      width="70vw"
      title="Chi tiết Book"
      onClose={() => setIsDrawerOpen(false)}
      open={isDrawerOpen}
    >
      <Descriptions column={2} title="Thông tin Book" bordered items={items} />

      <Divider orientation="left">Ảnh Books</Divider>

      <Upload
        showUploadList={{ showRemoveIcon: false }}
        listType="picture-card"
        fileList={fileList}
        onPreview={previewFile}
      ></Upload>

      {urlPreview === "" ? (
        <></>
      ) : (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: isPreviewOpen,
            onVisibleChange: () => {
              setIsPreviewOpen(false);
            },
          }}
          src={urlPreview}
        />
      )}
    </Drawer>
  );
};

export default BookDrawer;
