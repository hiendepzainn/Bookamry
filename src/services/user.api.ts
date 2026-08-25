import instance1 from "./axios.customize";

const getUserPaginate = (current: number, pageSize: number) => {
  const url = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
  return instance1.get<unknown, IBackendResponse<IDataPaginate<IUserTable>>>(
    url,
  );
};

export { getUserPaginate };
