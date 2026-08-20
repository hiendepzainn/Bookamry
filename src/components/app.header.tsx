import { useContext } from "react";
import { MyContext } from "./context/app.context";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import { Avatar, Badge, Button, Dropdown, Input, Space } from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

const AppHeader = () => {
  const CART_ITEM_COUNT = 3;

  const { user, authenticated } = useContext(MyContext);

  const userMenuItems: MenuProps["items"] = [
    ...(user.role === "ADMIN"
      ? [{ key: "admin", label: <Link to="/admin">Trang quản trị</Link> }]
      : []),
    {
      key: "profile",
      label: <Link to="/profile">Quản lý tài khoản</Link>,
    },
    {
      key: "orders",
      label: <Link to="/orders">Lịch sử mua hàng</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: <Link to="/logout">Logout</Link>,
      danger: true,
    },
  ];

  return (
    <header style={styles.header}>
      {/* LEFT: Logo & Brand Name */}
      <Link to="/" style={styles.leftSection}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          alt="React Logo"
          style={styles.logo}
        />
        <span style={styles.brandName}>Bookamry</span>
      </Link>

      {/* MIDDLE: Search Bar */}
      <div style={styles.middleSection}>
        <Input
          prefix={<SearchOutlined style={{ color: "rgba(0,0,0,.45)" }} />}
          placeholder="Bạn tìm gì hôm nay"
          size="large"
          style={styles.searchInput}
        />
      </div>

      {/* RIGHT: Cart & User Info */}
      <div style={styles.rightSection}>
        {/* Cart Section */}
        <Badge count={CART_ITEM_COUNT} offset={[-2, 4]} size="small">
          <Link to="/cart">
            <ShoppingCartOutlined style={styles.cartIcon} />
          </Link>
        </Badge>

        {/* User Info Section (Hover Dropdown) */}
        {!authenticated ? (
          <Link to="/login">
            <Button type="primary">Login</Button>{" "}
          </Link>
        ) : (
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            arrow
          >
            <div style={styles.userInfo}>
              <Space>
                <Avatar
                  icon={<UserOutlined />}
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`}
                />
                <span style={styles.userName}>{user.fullName}</span>
              </Space>
            </div>
          </Dropdown>
        )}
      </div>
    </header>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    height: "72px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    cursor: "pointer",
  },
  logo: {
    width: "36px",
    height: "36px",
    marginRight: "12px",
  },
  brandName: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#1677ff",
  },
  middleSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: "0 40px",
  },
  searchInput: {
    maxWidth: "600px",
    width: "100%",
    borderRadius: "8px",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
  },
  cartIcon: {
    fontSize: "26px",
    cursor: "pointer",
    color: "#595959",
  },
  userInfo: {
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: "6px",
    transition: "background-color 0.2s",
  },
  userName: {
    fontWeight: 500,
    color: "#262626",
  },
};

export default AppHeader;
