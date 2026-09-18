import instance1 from "./axios.customize";

const getBooksHomepage = (current: number, pageSize: number, sort: ISort) => {
  const url = `/api/v1/book?current=${current}&pageSize=${pageSize}${sort.name === "" ? "" : `&sort=${sort.type === "asc" ? "" : "-"}${sort.name}`}`;
  return instance1.get<unknown, IBackendResponse<IDataPaginate<IBookTable>>>(
    url,
  );
};

export { getBooksHomepage };
