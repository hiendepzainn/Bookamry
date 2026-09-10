import { getBookCategory } from "@/services/book.api";
import { PlusOutlined } from "@ant-design/icons";
import {
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import { useEffect, useState } from "react";

interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (vue: boolean) => void;
}

const BookCreateModal = (props: IProps) => {
  const { isCreateModalOpen, setIsCreateModalOpen } = props;

  const [categoryList, setCategoryList] = useState<IBookCategory[]>([]);

  const fetchCategory = async () => {
    const list: IBookCategory[] = [];

    const res = await getBookCategory();

    if (res.data) {
      res.data.forEach((value) => {
        list.push({
          label: value,
          value: value.toLowerCase(),
        });
      });

      setCategoryList(list);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <Modal
      width="60vw"
      title="Thêm mới Book"
      open={isCreateModalOpen}
      okText="Tạo mới"
      cancelText="Hủy"
      onOk={() => {}}
      onCancel={() => {
        setIsCreateModalOpen(false);
      }}
    >
      <Divider />

      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<IBookCreate> label="Tên sách" name="mainText" rules={[]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<IBookCreate> label="Tác giả" name="author" rules={[]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={6}>
            <Form.Item<IBookCreate> label="Giá tiền" name="price" rules={[]}>
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) =>
                  value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                }
                addonAfter="đ"
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item<IBookCreate> label="Thể loại" name="category" rules={[]}>
              <Select options={categoryList} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item<IBookCreate> label="Số lượng" name="quantity" rules={[]}>
              <InputNumber />
            </Form.Item>
          </Col>

          <Col span={6}></Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<IBookCreate>
              label="Ảnh Thumbnail"
              name="thumbnail"
              rules={[]}
            >
              <Upload listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<IBookCreate> label="Ảnh Slider" name="slider" rules={[]}>
              <Upload listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default BookCreateModal;
