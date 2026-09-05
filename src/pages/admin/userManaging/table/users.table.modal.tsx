import { InboxOutlined } from "@ant-design/icons";
import { App, Modal, Table, Upload } from "antd";
import type { TableProps, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { useState } from "react";
import ExcelJS from "exceljs";

const { Dragger } = Upload;

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const ImportModal = (props: IProps) => {
  const { message } = App.useApp();
  const { isModalOpen, setIsModalOpen } = props;

  const [data, setData] = useState<IUserImport[]>([]);

  const columns: TableProps<IUserImport>["columns"] = [
    {
      title: "Tên hiển thị",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  const changeDragger = (info: UploadChangeParam<UploadFile<unknown>>) => {
    const validMimeType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    //check valid .xlsx
    if (info.file.type !== validMimeType) {
      message.error("File tải lên không hợp lệ!");
      setData([]);
      return;
    }

    const file = (info.file.originFileObj || info.file) as Blob;
    const reader = new FileReader();

    try {
      reader.onload = async (e) => {
        const buffer = e.target!.result as ExcelJS.Buffer;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);

        // Lấy sheet đầu tiên
        const worksheet = workbook.getWorksheet(1);
        const row = worksheet?.getRow(1);

        if (
          !(
            (row?.values as string[])[1] === "fullName" &&
            (row?.values as string[])[2] === "email" &&
            (row?.values as string[])[3] === "phone"
          )
        ) {
          message.error("Format trong file .xlsx chưa chuẩn");
          setData([]);
          return;
        }

        const data: IUserImport[] = [];

        worksheet!.eachRow((row, rowNumber) => {
          if (rowNumber === 1) return;

          const newUser: IUserImport = {
            fullName: (row.values as string[])[1],
            email: (row.values as string[])[2],
            password: "Abc123@",
            phone: (row.values as string[])[3],
          };

          data.push(newUser);
        });

        setData(data);
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        title="Import data User"
        okText="Import"
        okButtonProps={{
          disabled: data.length === 0 ? true : false,
        }}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        width="55vw"
      >
        <Dragger
          multiple={false}
          maxCount={1} //max 1 file
          onChange={changeDragger}
          //no automatically send request (Dragger)
          beforeUpload={() => false}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single upload. Only accept .xlsx
          </p>
        </Dragger>

        <div style={{ margin: "20px 0px" }}>Dữ liệu upload:</div>

        <Table<IUserImport> columns={columns} dataSource={data} />
      </Modal>
    </>
  );
};

export default ImportModal;
