import { getUserPaginate } from "@/services/user.api";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Table } from "antd";
import type { TableProps } from "antd";
import { useEffect, useState } from "react";

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

const UsersPageAdmin = () => {
  const [data, setData] = useState<IUserTable[]>([]);

  const [tableLoading, setTableLoading] = useState<boolean>(false);

  const fetchUser = async () => {
    setTableLoading(true);

    const res = await getUserPaginate(1, 20);

    if (res.data) {
      setData(res.data.result);
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Table<IUserTable>
        columns={columns}
        dataSource={data}
        loading={tableLoading}
      />
    </>
  );
};

export default UsersPageAdmin;
