import { MyContext } from "@/components/context/app.context";
import { formatPrice } from "@/services/helpers";
import { DeleteTwoTone } from "@ant-design/icons";
import { Col, Divider, InputNumber, Row, Space } from "antd";
import { useContext } from "react";

const Cart = () => {
  const { cart } = useContext(MyContext);
  return (
    <Row style={{ backgroundColor: "#ddd", padding: "15px 40px" }}>
      <Col span={17}>
        {cart.map((item) => {
          return (
            <Row
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
                    423.934 đ
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
                <DeleteTwoTone twoToneColor="#ed183f" />
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
          <span style={{ fontSize: "16px" }}>624.123 đ</span>
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
            1.324.123 đ
          </span>
        </div>

        <Divider />

        <div style={{ textAlign: "center" }}>
          <button
            style={{
              width: "95%",
              // margin: "0px 15px",
              padding: "13px 15px",
              backgroundColor: "#EE4D2D",
              border: "1px solid #EE4D2D",
              borderRadius: "3px",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Mua hàng (2)
          </button>
        </div>
      </Col>
    </Row>
  );
};

export default Cart;
