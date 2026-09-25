import instance1 from "./axios.customize";

const createOrder = (
  name: string,
  address: string,
  phone: string,
  totalPrice: number,
  type: string,
  detail: IOrderDetail[],
) => {
  const url = `/api/v1/order`;
  const data = {
    name,
    address,
    phone,
    totalPrice,
    type,
    detail,
  };

  return instance1.post<unknown, IBackendResponse<string>>(url, data);
};

export { createOrder };
