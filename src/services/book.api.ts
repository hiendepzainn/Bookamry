import instance1 from "./axios.customize";

const getBooksPaginate = (
  current: number,
  pageSize: number,
  mainText: string,
  author: string,
  sort: ISort,
) => {
  const url = `/api/v1/book?current=${current}&pageSize=${pageSize}${mainText === "" ? `` : `&mainText=/${mainText}/i`}${author === "" ? `` : `&author=/${author}/i`}${sort.name === "" ? "" : `&sort=${sort.type === "ascend" ? "" : "-"}${sort.name}`}`;
  return instance1.get<unknown, IBackendResponse<IDataPaginate<IBookTable>>>(
    url,
  );
};

const getBookCategory = () => {
  const url = "/api/v1/database/category";
  return instance1.get<unknown, IBackendResponse<string[]>>(url);
};

export { getBooksPaginate, getBookCategory };
