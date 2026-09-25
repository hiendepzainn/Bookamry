import { Outlet } from "react-router-dom";
import AppFooter from "@/components/layout/app.footer";
import AppHeader from "@/components/layout/app.header";

const LayoutClient = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </>
  );
};

export default LayoutClient;
