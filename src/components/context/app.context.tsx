import { fetchAccount } from "@/services/auth.api";
import { Spin } from "antd";
import React, { createContext, useEffect, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

export const MyContext = createContext<IContext>({
  authenticated: false,
  setAuthenticated: () => {},
  user: {
    avatar: "",
    email: "",
    fullName: "",
    id: "",
    phone: "",
    role: "",
  },
  setUser: () => {},
  loadingApp: false,
  setLoadingApp: () => {},
});

const AppContext = (props: IProps) => {
  const [user, setUser] = useState<IDataLoginUser>({
    avatar: "",
    email: "",
    fullName: "",
    id: "",
    phone: "",
    role: "",
  });
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loadingApp, setLoadingApp] = useState<boolean>(false);

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
        <MyContext.Provider
          value={{
            user,
            setUser,
            authenticated,
            setAuthenticated,
            loadingApp,
            setLoadingApp,
          }}
        >
          {props.children}
        </MyContext.Provider>
      )}
    </>
  );
};

export default AppContext;
