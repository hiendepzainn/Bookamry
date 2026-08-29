import instance1 from "./axios.customize";

const getUserPaginate = (
  current: number,
  pageSize: number,
  fullName: string = "",
  email: string = "",
  createdAt: string[] = [],
) => {
  const url = `/api/v1/user?current=${current}&pageSize=${pageSize}${fullName == "" ? "" : `&fullName=/${fullName}/i`}${email == "" ? "" : `&email=/${email}/i`}${createdAt.length == 0 ? "" : `&createdAt>=${createdAt[0]}&createdAt<=${createdAt[1]}`}`;
  return instance1.get<unknown, IBackendResponse<IDataPaginate<IUserTable>>>(
    url,
  );
};

export { getUserPaginate };
