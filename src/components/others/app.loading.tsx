import { HeartOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useEffect, useState } from "react";

const AppLoading = () => {
  const [display, setDisplay] = useState<"none" | "block">("none");

  useEffect(() => {
    setTimeout(() => {
      setDisplay("block");
    }, 500);
  }, []);
  return (
    <>
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
        <Spin
          tip={
            <div style={{ color: "#c3c1c1", display: display }}>
              <div>
                Do điều kiện hạ tầng, lần truy cập web đầu tiên sẽ mất 15-20
                giây
              </div>
              <div>
                Cám ơn bạn đã chờ đợi <HeartOutlined />
              </div>
            </div>
          }
          fullscreen={true}
          size="large"
        />
      </div>
    </>
  );
};

export default AppLoading;
