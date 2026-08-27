import { getUserPaginate } from "@/services/user.api";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Pagination, Table } from "antd";
import type { TableProps } from "antd";
import { useEffect, useState } from "react";

const UsersTable = () => {
  const [data, setData] = useState<IUserTable[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const [tableLoading, setTableLoading] = useState<boolean>(false);

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
    await fetchUser(current, pageSize);
    setCurrent(current);
    setPageSize(pageSize);
  };

  const fetchUser = async (current: number, pageSize: number) => {
    setTableLoading(true);

    const res = await getUserPaginate(current, pageSize);

    if (res.data) {
      setTotal(res.data.meta.total);
      setData(res.data.result);
      setTableLoading(false);
    }
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
