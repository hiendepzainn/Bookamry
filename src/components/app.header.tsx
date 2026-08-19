import { useContext } from "react";
import { MyContext } from "./context/app.context";

const AppHeader = () => {
  const { user } = useContext(MyContext);

  return (
    <>
      <div>AppHeader</div>
      <div>USER: {JSON.stringify(user)}</div>
    </>
  );
};

export default AppHeader;
