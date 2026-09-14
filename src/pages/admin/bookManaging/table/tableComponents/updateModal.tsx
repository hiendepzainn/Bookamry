import { PlusOutlined } from "@ant-design/icons";
import {
  Col,
  Divider,
  Form,
  FormProps,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import { useEffect } from "react";

interface IProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (value: boolean) => void;
  dataUpdate: IBookTable;
  categoryList: IBookCategory[];
}

const BookUpdateModal = (props: IProps) => {
  const { dataUpdate, isUpdateModalOpen, setIsUpdateModalOpen, categoryList } =
    props;

  const [form] = Form.useForm<IBookCreate>();

  const onFinish: FormProps<IBookCreate>["onFinish"] = async (values) => {};

  useEffect(() => {
    form.setFieldsValue({
      mainText: dataUpdate.mainText,
      author: dataUpdate.author,
      category: dataUpdate.category,
      price: dataUpdate.price,
      quantity: dataUpdate.quantity,
    });
  }, [dataUpdate]);

  return (
    <Modal
      width="60vw"
      title="Update Book"
      open={isUpdateModalOpen}
      okText="Update"
      cancelText="Hủy"
      onOk={() => form.submit()}
      onCancel={() => {
        setIsUpdateModalOpen(false);
      }}
    >
      <Divider />

      <Form onFinish={onFinish} form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<IBookCreate>
              label="Tên sách"
              name="mainText"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<IBookCreate>
              label="Tác giả"
              name="author"
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
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={6}>
            <Form.Item<IBookCreate>
              label="Giá tiền"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống!",
                },
              ]}
            >
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
            <Form.Item<IBookCreate>
              label="Thể loại"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống!",
                },
              ]}
            >
              <Select options={categoryList} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item<IBookCreate>
              label="Số lượng"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống!",
                },
              ]}
            >
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
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống!",
                },
              ]}
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
            <Form.Item<IBookCreate> label="Ảnh Slider" name="slider">
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

export default BookUpdateModal;
