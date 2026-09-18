import { getBookCategory } from "@/services/book.api";
import { formatPrice } from "@/services/helpers";
import { getBooksHomepage } from "@/services/homepage.api";
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
  Grid,
  InputNumber,
  Pagination,
  Rate,
  Row,
  Spin,
  Tabs,
  TabsProps,
} from "antd";
import { useEffect, useState } from "react";

const Homepage = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const [categoryList, setCategoryList] = useState<IBookCategory[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);

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

  const [data, setData] = useState<IBookTable[]>([]);

  const fetchCategory = async () => {
    const list: IBookCategory[] = [];

    const res = await getBookCategory();

    if (res.data) {
      res.data.forEach((value) => {
        list.push({
          label: value,
          value: value,
        });
      });

      setCategoryList(list);
    }
  };

  const fetchBooks = async (current: number, pageSize: number) => {
    setIsLoading(true);
    const res = await getBooksHomepage(current, pageSize);

    if (res.data) {
      setData(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const changePagination = async (newPage: number, newPageSize: number) => {
    await fetchBooks(newPage, newPageSize);
    setCurrent(newPage);
    setPageSize(newPageSize);
  };

  useEffect(() => {
    fetchCategory();
    fetchBooks(current, pageSize);
  }, []);

  return (
    <>
      <Row>
        <Col
          style={{
            // border: "1px solid #ddd",
            padding: "12px",
            backgroundColor: "#ffffff",
            margin: "30px 20px 0px 20px",
            borderRadius: "8px",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
          xs={0}
          sm={4}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <FilterTwoTone />
                <span
                  style={{
                    marginLeft: "4px",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  Bộ lọc tìm kiếm
                </span>
              </div>

              <ReloadOutlined />
            </div>
          </div>

          <Divider />

          <div>
            <div style={{ margin: "5px 0px 20px" }}>Danh mục sản phẩm</div>

            <div>
              {categoryList.map((value) => {
                return (
                  <div key={value.label} style={{ marginBottom: "12px" }}>
                    <Checkbox>{value.label}</Checkbox>
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

        <Col
          style={{
            margin: "30px 0px 10px",
            padding: screens.xs ? "8px 0px 8px 10px" : "8px 0px 8px 30px",
            boxShadow: "rgba(147, 137, 137, 0.2) 0px 7px 29px 0px",
            borderRadius: "8px",
          }}
          xs={24}
          sm={18}
          lg={19}
        >
          <div>
            <Tabs defaultActiveKey="1" items={items} />
          </div>

          <Spin spinning={isLoading}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginBottom: "10px",
              }}
            >
              {data.map((item) => {
                return (
                  <div
                    key={item._id}
                    style={{
                      width: screens.xs
                        ? "43.25%"
                        : `${screens.xl ? `17%` : `${screens.md ? `20%` : `27%`}`}`,
                      padding: "6px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      marginRight: "10px",
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
                          src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.thumbnail}`}
                          alt="image"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <p
                        style={{
                          height: "3rem",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.mainText}
                      </p>
                    </div>

                    <div
                      style={{
                        color: "#EE4D2D",
                        fontSize: "17px",
                        fontWeight: "500",
                      }}
                    >
                      {formatPrice(item.price)}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Rate
                        style={{ fontSize: screens.xs ? "0.7rem" : "0.8rem" }}
                        disabled
                        defaultValue={5}
                      />
                      <span
                        style={{
                          fontSize: screens.xs ? "0.78rem" : "0.9rem",
                        }}
                      >
                        1k+ đã bán
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Spin>

          <Pagination
            align="center"
            total={total}
            current={current}
            pageSize={pageSize}
            onChange={changePagination}
          />
        </Col>
      </Row>
    </>
  );
};

export default Homepage;
