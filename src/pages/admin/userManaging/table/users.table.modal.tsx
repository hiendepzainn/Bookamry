import { InboxOutlined } from "@ant-design/icons";
import { Modal, Table, Upload } from "antd";
import type { TableProps } from "antd";

const { Dragger } = Upload;

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const ImportModal = (props: IProps) => {
  const { isModalOpen, setIsModalOpen } = props;

  const columns: TableProps<IUserTable>["columns"] = [
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

  return (
    <>
      <Modal
        title="Import data User"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        width="55vw"
      >
        <Dragger>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single upload. Only accept .csv, .xls, .xlsx
          </p>
        </Dragger>

        <div style={{ margin: "20px 0px" }}>Dữ liệu upload:</div>

        <Table<IUserTable> columns={columns} />
      </Modal>
    </>
  );
};

export default ImportModal;
