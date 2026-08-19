import React, { createContext, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

export const MyContext = createContext<IContext>({
  authenticated: false,
  user: {
    avatar: "",
    email: "",
    fullName: "",
    id: "",
    phone: "",
    role: "",
  },
  setAuthenticated: () => {},
  setUser: () => {},
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

  return (
    <MyContext.Provider
      value={{ user, setUser, authenticated, setAuthenticated }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default AppContext;
