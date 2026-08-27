import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Table } from "antd";
import type { TableProps } from "antd";

const columns: TableProps<IUserTable>["columns"] = [
  {
    title: "",
    key: "order",
    render: (value, record, index) => {
      return <div>{index}</div>;
    },
  },
  {
    title: "ID",
    dataIndex: "_id",
    key: "id",
  },
  {
    title: "Full Name",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (value) => {
      return (
        <div>{new Intl.DateTimeFormat("en-GB").format(new Date(value))}</div>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    render: () => {
      return (
        <div>
          <EditTwoTone style={{ marginRight: "10px" }} twoToneColor="#ff6421" />
          <DeleteTwoTone twoToneColor="#f71a1a" />
        </div>
      );
    },
  },
];

const data: IUserTable[] = [];

const UsersPageAdmin = () => {
  return (
    <>
      <Table<IUserTable> columns={columns} dataSource={data} />
    </>
  );
};

export default UsersPageAdmin;
