import instance1 from "./axios.customize";

const register = (data: IFieldRegister) => {
  const url = "/api/v1/user/register";
  return instance1.post<unknown, IBackendResponse<IDataRegister>>(url, data);
};

const login = (data: IFieldLogin) => {
  const url = "/api/v1/auth/login";
  return instance1.post<unknown, IBackendResponse<IDataLogin<IDataLoginUser>>>(
    url,
    data,
  );
};

export { register, login };
