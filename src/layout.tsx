import { Outlet } from "react-router-dom";
import AppFooter from "./components/app.footer";
import AppHeader from "./components/app.header";
import { useContext, useEffect } from "react";
import { fetchAccount } from "./services/auth.api";
import { MyContext } from "./components/context/app.context";

const Layout = () => {
  const { setAuthenticated, setUser } = useContext(MyContext);

  const fetchUser = async () => {
    const res = await fetchAccount();
    if (res.data) {
      setAuthenticated(true);
      setUser(res.data.user);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </>
  );
};

export default Layout;
