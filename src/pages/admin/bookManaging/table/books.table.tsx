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
    sort: ISort,
  ) => void;
  current: number;
  setCurrent: (value: number) => void;
  pageSize: number;
  setPageSize: (value: number) => void;
  setSort: (value: ISort) => void;
  sort: ISort;
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
    setSort,
    sort,
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
      sorter: true,
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      key: "category",
      sorter: true,
      width: "10%",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
      width: "20%",
      sorter: true,
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      render: (value) => formatPrice(value),
      width: "9%",
      sorter: true,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (value) => {
        return <div>{formatDate(value)}</div>;
      },
      width: "13%",
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

  const changePagination = async (page: number, pageSize: number) => {
    setCurrent(page);
    setPageSize(pageSize);
    await fetchBooks(
      page,
      pageSize,
      searchObject.mainText,
      searchObject.author,
      sort,
    );
  };

  const changeTable: TableProps<IBookTable>["onChange"] = (
    pagination,
    filters,
    sorter,
  ) => {
    //check empty object
    if (Object.keys(sorter).length !== 0) {
      //check is not Array
      if (!Array.isArray(sorter)) {
        const newSort: ISort = { name: "", type: "" };

        switch (sorter.order) {
          case "ascend":
            if (typeof sorter.field === "string") {
              newSort.name = sorter.field;
              newSort.type = sorter.order;
            }
            break;

          case "descend":
            if (typeof sorter.field === "string") {
              newSort.name = sorter.field;
              newSort.type = sorter.order;
            }
            break;

          default:
            break;
        }

        setSort(newSort);

        //fetchBooks
        fetchBooks(
          current,
          pageSize,
          searchObject.mainText,
          searchObject.author,
          newSort,
        );
      }
    }
  };

  useEffect(() => {
    fetchBooks(
      current,
      pageSize,
      searchObject.mainText,
      searchObject.author,
      sort,
    );
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="_id"
        loading={isLoadingTable}
        onChange={changeTable}
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
