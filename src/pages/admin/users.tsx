import AppLoading from "@/components/app.loading";
import { getUserPaginate } from "@/services/user.api";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Pagination } from "antd";
import { useEffect, useState } from "react";

const UsersPageAdmin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IUserTable[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const columns: ProColumns<IUserTable>[] = [
    {
      title: "",
      dataIndex: "index",
      valueType: "indexBorder",
      render: (node, record, index) => {
        return <div>{index + 1 + (current - 1) * pageSize}</div>;
      },
    },
    {
      title: "ID",
      dataIndex: "_id",
      render: (_, record) => {
        return <a>{record._id}</a>;
      },
      search: false,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Action",
      dataIndex: "",
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
      search: false,
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    const res = await getUserPaginate(current, pageSize);
    if (res.data) {
      setData(res.data.result);
      setTotal(res.data.meta.total);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [current, pageSize]);

  return (
    <>
      {loading ? (
        <>
          <AppLoading />
        </>
      ) : (
        <>
          <ProTable
            columns={columns}
            request={async () => {
              return { data: data };
            }}
            pagination={false}
            rowKey="_id"
          />
          <Pagination
            total={total}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
            pageSize={pageSize}
            current={current}
            align="end"
            onChange={(page, pageSize) => {
              setCurrent(page);
              setPageSize(pageSize);
            }}
            showSizeChanger={true}
          />
        </>
      )}
    </>
  );
};

export default UsersPageAdmin;
