import { useContext } from "react";
import { MyContext } from "../components/context/app.context";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  const { user, authenticated } = useContext(MyContext);

  return (
    <>
      {!authenticated || (authenticated && user.role !== "ADMIN") ? (
        <Outlet />
      ) : (
        <>
          <div>admin header</div>
          <Outlet />
          <div>admin footer</div>
        </>
      )}
    </>
  );
};

export default LayoutAdmin;
