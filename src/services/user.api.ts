import instance1 from "./axios.customize";

const getUserPaginate = (
  current: number,
  pageSize: number,
  fullName: string = "",
  email: string = "",
  createdAt: string[] = [],
  sort: ISort = { name: "", type: "" },
) => {
  const url = `/api/v1/user?current=${current}&pageSize=${pageSize}${fullName == "" ? "" : `&fullName=/${fullName}/i`}${email == "" ? "" : `&email=/${email}/i`}${createdAt.length == 0 ? "" : `&createdAt>=${createdAt[0]}&createdAt<=${createdAt[1]}`}${sort.name === "" ? `` : `&sort=${sort.type === "ascend" ? `` : `-`}${sort.name}`}`;
  return instance1.get<unknown, IBackendResponse<IDataPaginate<IUserTable>>>(
    url,
  );
};

const createNewUser = (data: IFieldRegister) => {
  const url = "/api/v1/user";
  return instance1.post<unknown, IBackendResponse<IUserTable>>(url, data);
};

export { getUserPaginate, createNewUser };
