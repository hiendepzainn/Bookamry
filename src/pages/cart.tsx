import { MyContext } from "@/components/context/app.context";
import { formatPrice } from "@/services/helpers";
import { DeleteTwoTone } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Empty,
  Form,
  FormProps,
  Input,
  InputNumber,
  Radio,
  Row,
  Space,
  Steps,
} from "antd";
import { useContext, useState } from "react";

const Cart = () => {
  const { cart, setCart } = useContext(MyContext);

  const [form] = Form.useForm();

  const { TextArea } = Input;

  const [current, setCurrent] = useState<number>(0);

  const steps = [
    {
      title: "Kiểm tra đơn hàng",
    },
    {
      title: "Đặt hàng",
    },
    {
      title: "Thanh toán",
    },
  ];

  const stepItems = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const optionsRadio = [
    { value: "COD", label: "Thanh toán khi nhận hàng" },
    { value: "BANKING", label: "Chuyển khoản ngân hàng" },
  ];

  const changeInputNumber = (id: string, value: number | null) => {
    if (value == null) return;

    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: value };
      }
      return item;
    });

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getTotalFromCart = (cart: IBookInCart[]) => {
    let total: number = 0;

    cart.forEach((item) => {
      total += item.quantity * item.detail.price;
    });

    return total;
  };

  const deleteBookById = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const onFinish: FormProps<IOrderInfor>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  return (
    <Row style={{ backgroundColor: "#e6e6e6", padding: "15px 40px" }}>
      <Col
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "6px",
          margin: "0px 0px 20px 10px",
        }}
        span={23}
      >
        <Steps current={current} items={stepItems} />
      </Col>

      {current === 0 && (
        <>
          <Col span={17}>
            {cart.map((item) => {
              return (
                <Row
                  key={item.id}
                  style={{
                    backgroundColor: "#fff",
                    margin: "0px 0px 12px",
                    height: "15vh",
                    padding: "10px",
                    boxSizing: "content-box",
                    borderRadius: "5px",
                  }}
                >
                  <Col style={{ height: "100%" }} span={3}>
                    <div
                      style={{
                        // backgroundColor: "red",
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <img
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "contain",
                        }}
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.detail.thumbnail}`}
                      />
                    </div>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0px 0px 0px 30px",
                    }}
                    span={8}
                  >
                    {item.detail.mainText}
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    span={3}
                  >
                    {formatPrice(item.detail.price)}
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    span={3}
                  >
                    <InputNumber
                      min={1}
                      max={item.detail.quantity}
                      value={item.quantity}
                      onChange={(value) => changeInputNumber(item.id, value)}
                    />
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    span={6}
                  >
                    <Space>
                      <span>Tổng:</span>
                      <span style={{ fontSize: "15px", fontWeight: "500" }}>
                        {formatPrice(item.detail.price * item.quantity)}
                      </span>
                    </Space>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    span={1}
                  >
                    <DeleteTwoTone
                      twoToneColor="#ed183f"
                      onClick={() => deleteBookById(item.id)}
                    />
                  </Col>
                </Row>
              );
            })}
            {cart.length === 0 && (
              <Empty description="Không có sản phẩm trong giỏ hàng" />
            )}
          </Col>

          <Col
            style={{
              backgroundColor: "#fff",
              padding: "15px 15px",
              marginLeft: "20px",
              borderRadius: "5px",
            }}
            span={6}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Tạm tính</span>
              <span style={{ fontSize: "16px" }}>
                {formatPrice(getTotalFromCart(cart))}
              </span>
            </div>

            <Divider />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Tổng tiền</span>
              <span style={{ fontSize: "25px", color: "#EE4D2D" }}>
                {formatPrice(getTotalFromCart(cart))}
              </span>
            </div>

            <Divider />

            <div style={{ textAlign: "center" }}>
              {cart.length !== 0 && (
                <button
                  style={{
                    width: "95%",
                    padding: "13px 15px",
                    backgroundColor: "#EE4D2D",
                    border: "1px solid #EE4D2D",
                    borderRadius: "3px",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => setCurrent(1)}
                >
                  Mua hàng ({cart.length})
                </button>
              )}
            </div>
          </Col>
        </>
      )}

      {current === 1 && (
        <>
          <Col span={17}>
            {cart.map((item) => {
              return (
                <Row
                  key={item.id}
                  style={{
                    backgroundColor: "#fff",
                    margin: "0px 0px 12px",
                    height: "15vh",
                    padding: "10px",
                    boxSizing: "content-box",
                    borderRadius: "5px",
                  }}
                >
                  <Col style={{ height: "100%" }} span={3}>
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <img
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "contain",
                        }}
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.detail.thumbnail}`}
                      />
                    </div>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0px 0px 0px 30px",
                    }}
                    span={8}
                  >
                    {item.detail.mainText}
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    span={3}
                  >
                    {formatPrice(item.detail.price)}
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    span={3}
                  >
                    <div>SL: {item.quantity}</div>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    span={6}
                  >
                    <Space>
                      <span>Tổng:</span>
                      <span style={{ fontSize: "15px", fontWeight: "500" }}>
                        {formatPrice(item.detail.price * item.quantity)}
                      </span>
                    </Space>
                  </Col>
                </Row>
              );
            })}
            <Button type="primary" onClick={() => setCurrent(0)}>
              Quay lại
            </Button>
          </Col>

          <Col
            style={{
              backgroundColor: "#fff",
              padding: "15px 15px",
              marginLeft: "20px",
              borderRadius: "5px",
            }}
            span={6}
          >
            <Form onFinish={onFinish} form={form} layout="vertical">
              <Form.Item<IOrderInfor>
                name={"paymentMethod"}
                label="Hình thức thanh toán"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn hình thức thanh toán",
                  },
                ]}
              >
                <Radio.Group options={optionsRadio} />
              </Form.Item>

              <Form.Item<IOrderInfor>
                name={"name"}
                label="Họ tên"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng không bỏ trống!",
                  },
                  {
                    pattern: /^[a-zA-ZÀ-ỹ\s]+$/,
                    message: "Chỉ được phép nhập chữ cái!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<IOrderInfor>
                name={"phone"}
                label="Số điện thoại"
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value || value.trim() === "") {
                        return Promise.reject(
                          new Error("Vui lòng không bỏ trống số điện thoại!"),
                        );
                      }

                      if (!/^\d+$/.test(value)) {
                        return Promise.reject(
                          new Error(
                            "Số điện thoại chỉ được phép chứa các chữ số!",
                          ),
                        );
                      }

                      if (value.length !== 10) {
                        return Promise.reject(
                          new Error("Số điện thoại phải có đúng 10 chữ số!"),
                        );
                      }

                      const validPrefixes = ["03", "05", "07", "08", "09"];
                      const prefix = value.substring(0, 2);
                      if (!validPrefixes.includes(prefix)) {
                        return Promise.reject(
                          new Error(
                            "Đầu số điện thoại phải bắt đầu bằng 03, 05, 07, 08, 09!",
                          ),
                        );
                      }

                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<IOrderInfor>
                name={"address"}
                label="Địa chỉ nhận hàng"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng không bỏ trống email!",
                  },
                ]}
              >
                <TextArea rows={3} />
              </Form.Item>
            </Form>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Tạm tính</span>
              <span style={{ fontSize: "16px" }}>
                {formatPrice(getTotalFromCart(cart))}
              </span>
            </div>

            <Divider />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Tổng tiền</span>
              <span style={{ fontSize: "25px", color: "#EE4D2D" }}>
                {formatPrice(getTotalFromCart(cart))}
              </span>
            </div>

            <Divider />

            <div style={{ textAlign: "center" }}>
              <button
                style={{
                  width: "95%",
                  padding: "13px 15px",
                  backgroundColor: "#EE4D2D",
                  border: "1px solid #EE4D2D",
                  borderRadius: "3px",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => form.submit()}
              >
                Đặt hàng ({cart.length})
              </button>
            </div>
          </Col>
        </>
      )}
    </Row>
  );
};

export default Cart;
