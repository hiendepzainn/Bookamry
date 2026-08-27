import { Button, Col, DatePicker, Form, Input, Row, Space } from "antd";
import type { FormProps } from "antd";

const { RangePicker } = DatePicker;

const UsersSearch = () => {
  const onFinish: FormProps<IUserSearchField>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  return (
    <div>
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item<IUserSearchField> name="fullName" label="Full Name">
              <Input placeholder="Please enter" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item<IUserSearchField> name="email" label="Email">
              <Input placeholder="Please enter" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item<IUserSearchField> name="createdAt" label="Created At">
              <RangePicker />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Space>
              <Button htmlType="button">Reset</Button>
              <Button htmlType="submit" type="primary">
                Search
              </Button>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UsersSearch;
