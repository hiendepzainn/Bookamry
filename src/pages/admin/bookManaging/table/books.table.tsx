import { getBooksPaginate } from "@/services/book.api";
import { formatDate, formatPrice } from "@/services/helpers";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Pagination, Table } from "antd";
import type { TableProps } from "antd";
import { useEffect, useState } from "react";

const BookTable = () => {
  const [data, setData] = useState<IBookTable[]>([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  const [isLoadingTable, setIsLoadingTable] = useState(false);

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

  const fetchBooks = async (current: number, pageSize: number) => {
    setIsLoadingTable(true);
    const res = await getBooksPaginate(current, pageSize);
    if (res.data) {
      setData(res.data.result);
      setTotal(res.data.meta.total);
      setIsLoadingTable(false);
    }
  };

  const changePagination = async (page: number, pageSize: number) => {
    setCurrent(page);
    setPageSize(pageSize);
    await fetchBooks(page, pageSize);
  };

  useEffect(() => {
    fetchBooks(current, pageSize);
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
