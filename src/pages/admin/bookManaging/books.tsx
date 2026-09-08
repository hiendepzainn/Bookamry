import { useState } from "react";
import BookSearch from "./search/books.search";
import BookTable from "./table/books.table";
import { getBooksPaginate } from "@/services/book.api";

const BooksPageAdmin = () => {
  const [data, setData] = useState<IBookTable[]>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [total, setTotal] = useState(0);

  const [searchObject, setSearchObject] = useState<IBookSearchField>({
    mainText: "",
    author: "",
  });

  const [isLoadingTable, setIsLoadingTable] = useState(false);

  const fetchBooks = async (
    current: number,
    pageSize: number,
    mainText: string,
    author: string,
  ) => {
    setIsLoadingTable(true);
    const res = await getBooksPaginate(current, pageSize, mainText, author);
    if (res.data) {
      setData(res.data.result);
      setTotal(res.data.meta.total);
      setIsLoadingTable(false);
    }
  };
  return (
    <>
      <BookSearch
        searchObject={searchObject}
        setSearchObject={setSearchObject}
        fetchBooks={fetchBooks}
        pageSize={pageSize}
        setCurrent={setCurrent}
      />
      <BookTable
        searchObject={searchObject}
        data={data}
        total={total}
        isLoadingTable={isLoadingTable}
        fetchBooks={fetchBooks}
        current={current}
        setCurrent={setCurrent}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </>
  );
};

export default BooksPageAdmin;
