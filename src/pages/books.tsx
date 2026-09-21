import {
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Col, Divider, Rate, Row, Space } from "antd";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const params = useParams();
  console.log(params.id);
  return (
    <div
      style={{
        margin: "20px 30px",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        padding: "20px 20px",
      }}
    >
      <Row gutter={24}>
        <Col style={{ backgroundColor: "#f46c6c" }} span={10}>
          slider
        </Col>

        <Col style={{ backgroundColor: "#a7f772" }} span={14}>
          <div>
            Tác giả: <a>Robert Kiyosaki</a>
          </div>

          <div style={{ fontSize: "20px" }}>
            Tư Duy Về Tiền Bạc - Lựa Chọn Tài Chính Đúng Đắn Và Sáng Suốt
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Rate style={{ fontSize: "15px" }} disabled defaultValue={5} />

            <Divider type="vertical" />

            <div>45 đã bán</div>
          </div>

          <div
            style={{
              fontSize: "28px",
              fontWeight: "600",
              color: "#EE4D2D",
              padding: "20px 16px",
              backgroundColor: "#ddd",
              margin: "20px 0px",
            }}
          >
            960.000 đ
          </div>

          <div>
            <Row>
              <Col span={4}>
                <span>Vận chuyển</span>
              </Col>
              <Col span={20}>
                <span>Miễn phí vận chuyển</span>
              </Col>
            </Row>

            <Row
              style={{
                display: "flex",
                alignItems: "center",
                margin: "20px 0px",
              }}
            >
              <Col span={4}>
                <span>Số lượng</span>
              </Col>

              <Col span={20}>
                <button style={{ width: "30px", height: "30px" }}>
                  <MinusOutlined />
                </button>
                <button style={{ width: "45px", height: "30px" }}>1</button>
                <button style={{ width: "30px", height: "30px" }}>
                  <PlusOutlined />
                </button>
              </Col>
            </Row>

            <div>
              <Space size={"middle"}>
                <button
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#FFEDEB",
                    border: "1px solid #EE4D2D",
                    borderRadius: "3px",
                    color: "#EE4D2D",
                  }}
                >
                  <ShoppingCartOutlined />
                  <span> Thêm vào giỏ hàng</span>
                </button>

                <button
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#EE4D2D",
                    border: "1px solid #EE4D2D",
                    borderRadius: "3px",
                    color: "#fff",
                  }}
                >
                  Mua ngay
                </button>
              </Space>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BookDetails;
