import instance1 from "./axios.customize";

const getBooksHomepage = (current: number, pageSize: number) => {
  const url = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
  return instance1.get<unknown, IBackendResponse<IDataPaginate<IBookTable>>>(
    url,
  );
};

export { getBooksHomepage };
