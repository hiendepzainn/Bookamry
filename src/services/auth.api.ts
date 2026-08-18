import instance1 from "./axios.customize";

const register = (data: IFieldRegister) => {
  const url = "/api/v1/user/register";
  return instance1.post<unknown, IBackendResponse<IDataRegister>>(url, data);
};

export { register };
