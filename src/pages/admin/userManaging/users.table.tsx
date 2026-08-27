import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Pagination, Table } from "antd";
import type { TableProps } from "antd";
import { useEffect } from "react";

interface IProps {
  data: IUserTable[];
  total: number;
  tableLoading: boolean;
  fetchUser: (
    current: number,
    pageSize: number,
    fullName?: string,
    email?: string,
  ) => void;
  pageSize: number;
  setPageSize: (value: number) => void;
  current: number;
  setCurrent: (value: number) => void;
  searchObject: IUserSearchField;
}

const UsersTable = (props: IProps) => {
  const {
    data,
    total,
    tableLoading,
    fetchUser,
    pageSize,
    setPageSize,
    current,
    setCurrent,
    searchObject,
  } = props;

  const columns: TableProps<IUserTable>["columns"] = [
    {
      title: "",
      key: "order",
      render: (value, record, index) => {
        return <div>{(current - 1) * pageSize + index + 1}</div>;
      },
    },
    {
      title: "ID",
      dataIndex: "_id",
      key: "id",
      render: (value) => {
        return <a>{value}</a>;
      },
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
            <EditTwoTone
              style={{ marginRight: "10px" }}
              twoToneColor="#ff6421"
            />
            <DeleteTwoTone twoToneColor="#f71a1a" />
          </div>
        );
      },
    },
  ];

  const changePagination = async (current: number, pageSize: number) => {
    await fetchUser(
      current,
      pageSize,
      searchObject.fullName,
      searchObject.email,
    );
    setCurrent(current);
    setPageSize(pageSize);
  };

  useEffect(() => {
    fetchUser(current, pageSize);
  }, []);

  return (
    <>
      <Table<IUserTable>
        style={{ marginBottom: "10px" }}
        columns={columns}
        dataSource={data}
        loading={tableLoading}
        pagination={false}
        rowKey="_id"
      />
      <Pagination
        align="end"
        current={current}
        pageSize={pageSize}
        total={total}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        showSizeChanger={true}
        onChange={changePagination}
      />
    </>
  );
};

export default UsersTable;
