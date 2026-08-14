import { Button, Divider, Form, Input } from "antd";
import type { FormProps } from "antd";
import { Link } from "react-router-dom";

interface IResult {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

const RegisterPage = () => {
  const onFinish: FormProps<IResult>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

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
          <Form<IResult> layout="vertical" onFinish={onFinish}>
            <h2>Đăng ký tài khoản</h2>
            <Divider />

            <Form.Item<IResult>
              label="Họ tên"
              name="fullName"
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

            <Form.Item<IResult>
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống email!",
                },
                {
                  type: "email",
                  message: "Email không đúng định dạng!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<IResult>
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value || value.trim() === "") {
                      return Promise.reject(
                        new Error("Vui lòng không bỏ trống mật khẩu!"),
                      );
                    }

                    if (value.length < 6) {
                      return Promise.reject(
                        new Error("Mật khẩu phải có ít nhất 6 ký tự!"),
                      );
                    }

                    if (value.length > 25) {
                      return Promise.reject(
                        new Error("Mật khẩu không được vượt quá 25 ký tự!"),
                      );
                    }

                    if (!/[A-Z]/.test(value)) {
                      return Promise.reject(
                        new Error(
                          "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa!",
                        ),
                      );
                    }

                    if (!/[a-z]/.test(value)) {
                      return Promise.reject(
                        new Error(
                          "Mật khẩu phải chứa ít nhất 1 chữ cái viết thường!",
                        ),
                      );
                    }

                    if (!/\d/.test(value)) {
                      return Promise.reject(
                        new Error("Mật khẩu phải chứa ít nhất 1 chữ số!"),
                      );
                    }

                    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                      return Promise.reject(
                        new Error(
                          "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt!",
                        ),
                      );
                    }

                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<IResult>
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value || value.trim() === "") {
                      return Promise.reject(
                        new Error("Vui lòng không bỏ trống số điện thoại!"),
                      );
                    }

                    if (!/^\d+$/.test(value)) {
                      return Promise.reject(
                        new Error(
                          "Số điện thoại chỉ được phép chứa các chữ số!",
                        ),
                      );
                    }

                    if (value.length !== 10) {
                      return Promise.reject(
                        new Error("Số điện thoại phải có đúng 10 chữ số!"),
                      );
                    }

                    const validPrefixes = ["03", "05", "07", "08", "09"];
                    const prefix = value.substring(0, 2);
                    if (!validPrefixes.includes(prefix)) {
                      return Promise.reject(
                        new Error(
                          "Đầu số điện thoại phải bắt đầu bằng 03, 05, 07, 08, 09!",
                        ),
                      );
                    }

                    return Promise.resolve();
                  },
                },
              ]}
            >
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
