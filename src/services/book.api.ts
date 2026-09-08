import instance1 from "./axios.customize";

const getBooksPaginate = (
  current: number,
  pageSize: number,
  mainText: string,
  author: string,
) => {
  const url = `/api/v1/book?current=${current}&pageSize=${pageSize}${mainText === "" ? `` : `&mainText=/${mainText}/i`}${author === "" ? `` : `&author=/${author}/i`}`;
  return instance1.get<unknown, IBackendResponse<IDataPaginate<IBookTable>>>(
    url,
  );
};

export { getBooksPaginate };
