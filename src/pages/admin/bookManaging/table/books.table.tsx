import { formatDate, formatPrice } from "@/services/helpers";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Pagination, Table } from "antd";
import type { TableProps } from "antd";
import { useEffect } from "react";

interface IProps {
  searchObject: IBookSearchField;
  data: IBookTable[];
  total: number;
  isLoadingTable: boolean;
  fetchBooks: (
    current: number,
    pageSize: number,
    mainText: string,
    author: string,
  ) => void;
  current: number;
  setCurrent: (value: number) => void;
  pageSize: number;
  setPageSize: (value: number) => void;
}

const BookTable = (props: IProps) => {
  const {
    searchObject,
    data,
    total,
    isLoadingTable,
    fetchBooks,
    current,
    setCurrent,
    pageSize,
    setPageSize,
  } = props;

  const columns: TableProps<IBookTable>["columns"] = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "id",
      render: (value) => {
        return <a>{value}</a>;
      },
    },
    {
      title: "Tên sách",
      dataIndex: "mainText",
      key: "mainText",
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
      width: "20%",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      render: (value) => formatPrice(value),
      width: "9%",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (value) => {
        return <div>{formatDate(value)}</div>;
      },
      width: "12%",
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

  const changePagination = async (page: number, pageSize: number) => {
    setCurrent(page);
    setPageSize(pageSize);
    await fetchBooks(
      page,
      pageSize,
      searchObject.mainText,
      searchObject.author,
    );
  };

  useEffect(() => {
    fetchBooks(current, pageSize, searchObject.mainText, searchObject.author);
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="_id"
        loading={isLoadingTable}
      />
      <Pagination
        style={{ marginTop: "15px" }}
        align="end"
        total={total}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        current={current}
        pageSize={pageSize}
        showSizeChanger={true}
        onChange={changePagination}
      />
    </>
  );
};

export default BookTable;
