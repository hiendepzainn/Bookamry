import {
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Col, Divider, Grid, Rate, Row, Space } from "antd";
import ImageGallery, { GalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const params = useParams();
  console.log(params.id);

  const images: GalleryItem[] = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  return (
    <div
      style={{
        margin: screens.md ? "20px 30px" : "10px 10px",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        padding: "20px 20px",
      }}
    >
      <Row gutter={24}>
        <Col xs={24} sm={24} md={10}>
          <ImageGallery
            items={images}
            showPlayButton={false}
            showFullscreenButton={false}
            showNav={false}
          />
        </Col>

        {screens.md ? <></> : <Divider style={{ margin: "15px 0px" }} />}

        <Col xs={24} sm={24} md={14}>
          <div>
            Tác giả: <a>Robert Kiyosaki</a>
          </div>

          <div style={{ fontSize: "20px", margin: "5px 0px" }}>
            Tư Duy Về Tiền Bạc - Lựa Chọn Tài Chính Đúng Đắn Và Sáng Suốt
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Rate style={{ fontSize: "15px" }} disabled defaultValue={5} />

            <Divider type="vertical" />

            <div>45 đã bán</div>
          </div>

          <div
            style={{
              fontSize: screens.md ? "28px" : "24px",
              fontWeight: "600",
              color: "#EE4D2D",
              padding: screens.md ? "20px 16px" : "10px 14px",
              backgroundColor: "#F9F9F9",
              margin: screens.md ? "10px 0px 20px" : "10px 0px 10px",
            }}
          >
            960.000 đ
          </div>

          <div>
            <Row>
              <Col lg={4} sm={6} xs={8}>
                <span>Vận chuyển</span>
              </Col>
              <Col lg={20} sm={18} xs={16}>
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
              <Col lg={4} sm={6} xs={8}>
                <span>Số lượng</span>
              </Col>

              <Col lg={20} sm={18} xs={16}>
                <button
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                  }}
                >
                  <MinusOutlined />
                </button>
                <button
                  style={{
                    width: "45px",
                    height: "30px",
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                  }}
                >
                  1
                </button>
                <button
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                  }}
                >
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
