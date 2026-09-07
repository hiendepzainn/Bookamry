import { getBooksPaginate } from "@/services/book.api";
import { formatDate, formatPrice } from "@/services/helpers";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Table } from "antd";
import type { TableProps } from "antd";
import { useEffect, useState } from "react";

const BookTable = () => {
  const [data, setData] = useState<IBookTable[]>([]);
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

  const fetchBooks = async () => {
    const res = await getBooksPaginate();
    if (res.data) {
      setData(res.data.result);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default BookTable;
