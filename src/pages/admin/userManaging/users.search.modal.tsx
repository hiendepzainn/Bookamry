import { Divider, Form, Input, Modal } from "antd";

const UsersModal = () => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Thêm mới người dùng"
      closable={{ "aria-label": "Custom Close Button" }}
      open={true}
      onOk={() => {
        form.submit();
      }}
      // onCancel={handleCancel}
      okText="Tạo mới"
      cancelText="Hủy"
    >
      <Divider />
      <Form layout="vertical" form={form}>
        <Form.Item<IFieldRegister>
          label="Tên hiển thị"
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

        <Form.Item<IFieldRegister>
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

        <Form.Item<IFieldRegister>
          label="Password"
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
                    new Error("Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa!"),
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
                    new Error("Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt!"),
                  );
                }

                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<IFieldRegister>
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
                    new Error("Số điện thoại chỉ được phép chứa các chữ số!"),
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
      </Form>
    </Modal>
  );
};

export default UsersModal;
