import { Button, Divider, Form, Input } from "antd";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "35vw",
            padding: "25px",
            marginTop: "20px",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <Form layout="vertical">
            <h2>Đăng ký tài khoản</h2>
            <Divider />

            <Form.Item label="Họ tên" name="fullName" rules={[]}>
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[]}>
              <Input />
            </Form.Item>

            <Form.Item label="Mật khẩu" name="password" rules={[]}>
              <Input.Password />
            </Form.Item>

            <Form.Item label="Số điện thoại" name="phone" rules={[]}>
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Đăng ký
              </Button>
            </Form.Item>

            <Divider>Or</Divider>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span>
                Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
