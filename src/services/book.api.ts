import instance1 from "./axios.customize";

const getBooksPaginate = (current: number, pageSize: number) => {
  const url = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
  return instance1.get<unknown, IBackendResponse<IDataPaginate<IBookTable>>>(
    url,
  );
};

export { getBooksPaginate };
