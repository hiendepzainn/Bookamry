import { useContext, useState } from "react";
import { MyContext } from "../components/context/app.context";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Avatar, Button, Dropdown, Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  AppstoreOutlined,
  BookOutlined,
  DollarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const siderItems = [
  {
    key: "dashboard",
    icon: <AppstoreOutlined />,
    label: <Link to="/admin">Dashboard</Link>,
  },
  {
    key: "users",
    icon: <UserOutlined />,
    label: <Link to="/admin/users">Manage Users</Link>,
  },
  {
    key: "books",
    icon: <BookOutlined />,
    label: <Link to="/admin/books">Manage Books</Link>,
  },
  {
    key: "orders",
    icon: <DollarOutlined />,
    label: <Link to="/admin/orders">Manage Orders</Link>,
  },
];

const adminMenuItems: MenuProps["items"] = [
  {
    key: "profile",
    label: <Link to="/profile">Quản lý tài khoản</Link>,
  },
  {
    key: "orders",
    label: <Link to="/">Trang chủ</Link>,
  },
  {
    type: "divider",
  },
  {
    key: "logout",
    label: <Link to="/logout">Đăng xuất</Link>,
    danger: true,
  },
];

const LayoutAdmin = () => {
  const location = useLocation();
  let defaultSelectedKey = "";
  switch (location.pathname) {
    case "/admin":
      defaultSelectedKey = "dashboard";
      break;
    case "/admin/users":
      defaultSelectedKey = "users";
      break;
    case "/admin/books":
      defaultSelectedKey = "books";
      break;
    case "/admin/orders":
      defaultSelectedKey = "orders";
      break;
  }

  const { user, authenticated } = useContext(MyContext);

  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {!authenticated || (authenticated && user.role !== "ADMIN") ? (
        <Outlet />
      ) : (
        <Layout>
          <Sider style={{ height: "100vh" }} collapsed={collapsed}>
            <div
              style={{
                textAlign: "center",
                color: "#FFF",
                padding: "16px 0px",
              }}
            >
              {" "}
              ADMIN
            </div>
            <Menu
              theme="dark"
              items={siderItems}
              defaultSelectedKeys={[defaultSelectedKey]}
            />
          </Sider>
          <Layout>
            <Header
              style={{
                background: "#FFFFFF",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
              ></Button>
              <Dropdown
                menu={{ items: adminMenuItems }}
                placement="bottomRight"
                arrow
              >
                <Button style={{ padding: "20px 15px" }} type="text">
                  <Avatar
                    icon={<UserOutlined />}
                    src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`}
                  />
                  <span>{user.fullName}</span>
                </Button>
              </Dropdown>
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#FFFFFF",
                borderRadius: "8px",
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      )}
    </>
  );
};

export default LayoutAdmin;
