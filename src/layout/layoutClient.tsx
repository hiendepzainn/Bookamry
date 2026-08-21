import { Outlet } from "react-router-dom";
import AppFooter from "../components/app.footer";
import AppHeader from "../components/app.header";
import { useContext, useEffect } from "react";
import { fetchAccount } from "../services/auth.api";
import { MyContext } from "../components/context/app.context";
import { Spin } from "antd";

const LayoutClient = () => {
  const { setAuthenticated, setUser, loadingApp, setLoadingApp } =
    useContext(MyContext);

  const fetchUser = async () => {
    setLoadingApp(true);

    const res = await fetchAccount();

    if (res.data) {
      setAuthenticated(true);
      setUser(res.data.user);
      setLoadingApp(false);
    }

    setLoadingApp(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      {loadingApp === true ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-50px",
            marginLeft: "-50px",
            width: "100px",
            height: "100px",
          }}
        >
          <Spin fullscreen={true} size="large" />
        </div>
      ) : (
        <>
          <AppHeader />
          <Outlet />
          <AppFooter />
        </>
      )}
    </>
  );
};

export default LayoutClient;
