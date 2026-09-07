import instance1 from "./axios.customize";

const getBooksPaginate = () => {
  const url = "/api/v1/book?current=1&pageSize=100";
  return instance1.get<unknown, IBackendResponse<IDataPaginate<IBookTable>>>(
    url,
  );
};

export { getBooksPaginate };
