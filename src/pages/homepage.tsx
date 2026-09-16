import { formatPrice } from "@/services/helpers";
import {
  ArrowRightOutlined,
  FilterTwoTone,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  InputNumber,
  Rate,
  Row,
  Tabs,
  TabsProps,
} from "antd";

const Homepage = () => {
  const optionsCheckbox = ["A", "B", "C", "D", "E", "F"];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Phổ biến",
    },
    {
      key: "2",
      label: "Hàng mới",
    },
    {
      key: "3",
      label: "Giá thấp đến cao",
    },
    {
      key: "4",
      label: "Giá cao đến thấp",
    },
  ];

  const data = [
    {
      _id: "6a7de43fff385ec18ae31988",
      thumbnail: "1-5e81d7f66dada42752efb220d7b2956c.jpg",
      slider: ["2-579456815ebd4eb1376341dcd00c4708.jpg"],
      mainText: "Tiền Đẻ Ra Tiền: Đầu Tư Tài Chính Thông Minh",
      author: "Ducan Bannatyne",
      price: 80000,
      sold: 2,
      quantity: 1000,
      category: "Business",
      createdAt: "2026-08-13T15:35:08.913Z",
      updatedAt: "2026-08-13T15:35:08.913Z",
      __v: 0,
    },
    {
      _id: "6a7de43fff385ec18ae31989",
      thumbnail: "3-931186dd6dcd231da1032c8220332fea.jpg",
      slider: [],
      mainText:
        "Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và Sáng Suốt Hơn",
      author: "Jonathan Clements",
      price: 70000,
      sold: 20,
      quantity: 1000,
      category: "Arts",
      createdAt: "2026-08-13T15:35:08.913Z",
      updatedAt: "2026-08-13T15:35:08.913Z",
      __v: 0,
    },
    {
      _id: "6a7de43fff385ec18ae3198a",
      thumbnail: "4-7827a39c17b68337b093de7850fc3337.jpg",
      slider: [],
      mainText: "How The Body Works - Hiểu Hết Về Cơ Thể",
      author: "Phạm Hằng Nguyên",
      price: 250000,
      sold: 20,
      quantity: 1000,
      category: "Teen",
      createdAt: "2026-08-13T15:35:08.913Z",
      updatedAt: "2026-08-13T15:35:08.913Z",
      __v: 0,
    },
    {
      _id: "6a7de43fff385ec18ae3198b",
      thumbnail: "5-c62daefbb240e7fe8c6d96a4b745824f.jpg",
      slider: [
        "6-645cfa932e9d4d81d12b9079a9647ffc.jpg",
        "7-e539a491766afce9774603ebbdc70e43.jpg",
      ],
      mainText: "Salt, Fat, Acid, Heat: Mastering the Elements of Good Cooking",
      author: "Fahasa",
      price: 649000,
      sold: 29,
      quantity: 1000,
      category: "Cooking",
      createdAt: "2026-08-13T15:35:08.913Z",
      updatedAt: "2026-08-13T15:35:08.913Z",
      __v: 0,
    },
    {
      _id: "6a7de43fff385ec18ae3198c",
      thumbnail: "8-341425768114119392af4e217bbe4db2.jpg",
      slider: [],
      mainText: "Diary Of A Wimpy Kid 09: The Long Haul",
      author: "Fahasa",
      price: 111123,
      sold: 29,
      quantity: 1000,
      category: "Entertainment",
      createdAt: "2026-08-13T15:35:08.913Z",
      updatedAt: "2026-08-13T15:35:08.913Z",
      __v: 0,
    },
    {
      _id: "6a7de43fff385ec18ae3198d",
      thumbnail: "9-3220b4dac1f50035b534f7b5a907b62e.jpg",
      slider: ["10-e4d30a34e0e1970b921e6c8de04515c6.jpg"],
      mainText: "Đại Việt Sử Ký Toàn Thư Trọn Bộ",
      author: "Bùi Thị Anh",
      price: 171000,
      sold: 29,
      quantity: 1000,
      category: "History",
      createdAt: "2026-08-13T15:35:08.913Z",
      updatedAt: "2026-08-13T15:35:08.913Z",
      __v: 0,
    },
    {
      _id: "6a7de43fff385ec18ae3198e",
      thumbnail: "11-dc801dd2a968c1a43ec9270728555fbe.jpg",
      slider: [],
      mainText: "Tự Học Nhạc Lý Cơ Bản",
      author: "TS. Phạm Phương Hoa, Trương Ngọc Bích, Cù Minh Nhật",
      price: 60000,
      sold: 29,
      quantity: 1000,
      category: "Music",
      createdAt: "2026-08-13T15:35:08.913Z",
      updatedAt: "2026-08-13T15:35:08.913Z",
      __v: 0,
    },
    {
      _id: "6a7de43fff385ec18ae3198f",
      thumbnail: "12-45dbffab3a67de798a132d43e80b833e.jpg",
      slider: [
        "13-1a0fdc34fa85b809e610ee7184a70fed.jpg",
        "14-6fa27e2ec564568754a71805908d4a64.jpg",
      ],
      mainText: "Sách Tư Duy Ngược Dịch Chuyển Thế Giới",
      author: "Adam Grant",
      price: 127000,
      sold: 29,
      quantity: 1000,
      category: "Sports",
      createdAt: "2026-08-13T15:35:08.913Z",
      updatedAt: "2026-08-13T15:35:08.913Z",
      __v: 0,
    },
    {
      _id: "6a7de43fff385ec18ae31990",
      thumbnail: "15-afa213ab31cefd06d49b977a2f4ab594.jpg",
      slider: [
        "16-09fd50a49274ca8b39a91cc535fd1996.jpg",
        "17-347d5cceff3af09e4967913742528d65.jpg",
      ],
      mainText: "Truyện Tranh Đam Mỹ - Làm Dâu Nhà Sói - Hana Inu",
      author: "Nhà sách Nam Trung",
      price: 52000,
      sold: 29,
      quantity: 1000,
      category: "Comics",
      createdAt: "2026-08-13T15:35:08.913Z",
      updatedAt: "2026-08-13T15:35:08.913Z",
      __v: 0,
    },
    {
      _id: "6a7de43fff385ec18ae31991",
      thumbnail: "18-0224e8d0a47a4f05ccb0dbe2062cfd92.jpg",
      slider: ["19-3c575c235f06fada416bac02f3116043.jpg"],
      mainText: "Cẩm Nang Du Lịch - Mỹ",
      author: "Dorling Kindersley Limited",
      price: 292000,
      sold: 29,
      quantity: 1000,
      category: "Travel",
      createdAt: "2026-08-13T15:35:08.913Z",
      updatedAt: "2026-08-13T15:35:08.913Z",
      __v: 0,
    },
    {
      _id: "6a7de43fff385ec18ae3198d",
      thumbnail: "9-3220b4dac1f50035b534f7b5a907b62e.jpg",
      slider: ["10-e4d30a34e0e1970b921e6c8de04515c6.jpg"],
      mainText: "Đại Việt Sử Ký Toàn Thư Trọn Bộ",
      author: "Bùi Thị Anh",
      price: 171000,
      sold: 29,
      quantity: 1000,
      category: "History",
      createdAt: "2026-08-13T15:35:08.913Z",
      updatedAt: "2026-08-13T15:35:08.913Z",
      __v: 0,
    },
  ];

  return (
    <>
      <Row>
        <Col style={{ border: "1px solid #ddd", padding: "8px" }} span={4}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <FilterTwoTone />
                <span style={{ marginLeft: "4px" }}>Bộ lọc tìm kiếm</span>
              </div>

              <ReloadOutlined />
            </div>

            <div style={{ margin: "5px 0px" }}>Danh mục sản phẩm</div>

            <div>
              {optionsCheckbox.map((value) => {
                return (
                  <div>
                    <Checkbox>{value}</Checkbox>
                  </div>
                );
              })}
            </div>
          </div>

          <Divider />

          <div>
            <div style={{ marginBottom: "8px" }}>Khoảng giá</div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "20px",
              }}
            >
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) =>
                  value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                }
              />

              <ArrowRightOutlined />

              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) =>
                  value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                }
              />
            </div>

            <div style={{ textAlign: "center" }}>
              <Button style={{ width: "80%" }} type="primary">
                Áp dụng
              </Button>
            </div>
          </div>

          <Divider />

          <div>
            <div style={{ marginBottom: "10px" }}>Đánh giá</div>

            <div>
              <div>
                <Rate disabled defaultValue={5} />
              </div>

              <div>
                <Rate disabled defaultValue={4} />
                <span>trở lên</span>
              </div>

              <div>
                <Rate disabled defaultValue={3} />
                <span>trở lên</span>
              </div>

              <div>
                <Rate disabled defaultValue={2} />
                <span>trở lên</span>
              </div>

              <div>
                <Rate disabled defaultValue={1} />
                <span>trở lên</span>
              </div>
            </div>
          </div>
        </Col>

        <Col style={{ padding: "8px" }} span={20}>
          <div>
            <Tabs defaultActiveKey="1" items={items} />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {data.map((item) => {
              return (
                <div
                  style={{
                    padding: "6px",
                    width: "18%",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    marginRight: "8px",
                    marginBottom: "6px",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                      style={{
                        width: "90%",
                        aspectRatio: "1/1",
                      }}
                    >
                      <img
                        width={"100%"}
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.thumbnail}`}
                        alt="image"
                      />
                    </div>
                  </div>

                  <div>
                    <p style={{ height: "10vh", fontSize: "14px" }}>
                      {item.mainText}
                    </p>
                  </div>

                  <div>{formatPrice(item.price)}</div>

                  <div>
                    <Rate disabled defaultValue={5} />
                    <span style={{ marginLeft: "5px" }}>Đã bán 1k</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Homepage;
