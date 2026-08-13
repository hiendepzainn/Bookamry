import { Outlet } from "react-router-dom";
import AppFooter from "./components/app.footer";
import AppHeader from "./components/app.header";

const Layout = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </>
  );
};

export default Layout;
