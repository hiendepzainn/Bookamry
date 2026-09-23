import { useContext } from "react";
import { MyContext } from "./context/app.context";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import { App, Avatar, Badge, Button, Dropdown, Grid, Input, Space } from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { logout } from "@/services/auth.api";

const AppHeader = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const { message } = App.useApp();

  const { user, authenticated, setAuthenticated, setUser, cart } =
    useContext(MyContext);

  const handleLogout = async () => {
    const res = await logout();

    if (res.data) {
      localStorage.removeItem("access_token");

      setAuthenticated(false);
      setUser({
        avatar: "",
        email: "",
        fullName: "",
        id: "",
        phone: "",
        role: "",
      });

      message.success("Logout successful!");
    }
  };

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
      label: (
        <div style={{ width: "100%" }} onClick={handleLogout}>
          Logout
        </div>
      ),
      danger: true,
    },
    {
      key: "413",
      label: <Link to="/books">books client</Link>,
    },
    {
      key: "235",
      label: <Link to="/checkout">checkout</Link>,
    },
  ];

  const styles: Record<string, React.CSSProperties> = {
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: screens.xs ? "0px" : "0 24px",
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
      marginRight: screens.xs ? "-12px" : "12px",
      marginLeft: screens.xs ? "18px" : "0px",
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
      padding: screens.xs ? "0 30px" : "0 40px",
    },
    searchInput: {
      maxWidth: "600px",
      width: "100%",
      borderRadius: "8px",
    },
    rightSection: {
      display: "flex",
      alignItems: "center",
      gap: screens.xs ? "16px" : "32px",
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

  return (
    <header style={styles.header}>
      {/* LEFT: Logo & Brand Name */}
      <Link to="/" style={styles.leftSection}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          alt="React Logo"
          style={styles.logo}
        />
        {screens.xs ? <></> : <span style={styles.brandName}>Bookamry</span>}
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
        <Badge count={cart.length} offset={[-2, 4]} size="small">
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
                {screens.xs ? (
                  <></>
                ) : (
                  <span style={styles.userName}>{user.fullName}</span>
                )}
              </Space>
            </div>
          </Dropdown>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
