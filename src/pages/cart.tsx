import { MyContext } from "@/components/context/app.context";
import { formatPrice } from "@/services/helpers";
import { DeleteTwoTone } from "@ant-design/icons";
import { Col, Divider, InputNumber, Row, Space } from "antd";
import { useContext } from "react";

const Cart = () => {
  const { cart, setCart } = useContext(MyContext);

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

  return (
    <Row style={{ backgroundColor: "#ddd", padding: "15px 40px" }}>
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
          {cart.length === 0 ? (
            <div>Hiện tại giỏ hàng đang không có sản phẩm</div>
          ) : (
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
            >
              Mua hàng ({cart.length})
            </button>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Cart;
