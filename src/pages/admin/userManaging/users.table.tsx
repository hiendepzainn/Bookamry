import { formatDate } from "@/services/helpers";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Pagination, Table } from "antd";
import type { TableProps } from "antd";
import { useEffect, useState } from "react";
import UsersDrawer from "./users.table.drawer";

interface IProps {
  data: IUserTable[];
  total: number;
  tableLoading: boolean;
  fetchUser: (
    current: number,
    pageSize: number,
    fullName?: string,
    email?: string,
    createdAt?: string[],
    sort?: ISort,
  ) => void;
  pageSize: number;
  setPageSize: (value: number) => void;
  current: number;
  setCurrent: (value: number) => void;
  searchObject: IUserSearchField;
  setSort: (value: ISort) => void;
  sort: ISort;
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
    setSort,
    sort,
  } = props;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userDrawer, setUserDrawer] = useState<IUserTable>({
    _id: "",
    fullName: "",
    email: "",
    phone: "",
    role: "",
    avatar: "",
    isActive: true,
    type: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });

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
      render: (value, record) => {
        return <a onClick={() => openDrawer(record)}>{value}</a>;
      },
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => {
        return <div>{formatDate(value)}</div>;
      },
      sorter: true,
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
      searchObject.createdAt,
      sort,
    );
    setCurrent(current);
    setPageSize(pageSize);
  };

  const changeTable: TableProps<IUserTable>["onChange"] = async (
    pagination,
    filters,
    sorter,
  ) => {
    if (Object.keys(sorter).length !== 0) {
      if (!Array.isArray(sorter)) {
        if (sorter.order && sorter.field && typeof sorter.field === "string") {
          const newSort = { name: sorter.field, type: sorter.order };
          setSort(newSort);
          await fetchUser(
            current,
            pageSize,
            searchObject.fullName,
            searchObject.email,
            searchObject.createdAt,
            newSort,
          );
        } else {
          const newSort = {
            name: "",
            type: "",
          };
          setSort(newSort);
          await fetchUser(
            current,
            pageSize,
            searchObject.fullName,
            searchObject.email,
            searchObject.createdAt,
            newSort,
          );
        }
      }
    }
  };

  const openDrawer = (user: IUserTable) => {
    //open drawer
    setIsDrawerOpen(true);
    //set data
    setUserDrawer(user);
  };

  useEffect(() => {
    fetchUser(
      current,
      pageSize,
      searchObject.fullName,
      searchObject.email,
      searchObject.createdAt,
      sort,
    );
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
        onChange={changeTable}
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
      <UsersDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        userDrawer={userDrawer}
      />
    </>
  );
};

export default UsersTable;
