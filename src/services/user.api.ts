import instance1 from "./axios.customize";

const getUserPaginate = (
  current: number,
  pageSize: number,
  fullName: string = "",
  email: string = "",
) => {
  const url = `/api/v1/user?current=${current}&pageSize=${pageSize}&fullName=${fullName == "" ? "" : `/${fullName}/i`}&email=${email == "" ? "" : `/${email}/i`}`;
  return instance1.get<unknown, IBackendResponse<IDataPaginate<IUserTable>>>(
    url,
  );
};

export { getUserPaginate };
