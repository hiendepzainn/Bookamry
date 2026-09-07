// import { Button, Input, Space } from "antd";

import { Button, Input, Space } from "antd";

const BookSearch = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "25px",
      }}
    >
      <div style={{ width: "75%" }}>
        <span style={{ marginRight: "10px" }}>Tên sách:</span>
        <Input style={{ width: "40%", marginRight: "20px" }} />

        <span style={{ marginRight: "10px" }}>Tác giả:</span>
        <Input style={{ width: "40%" }} />
      </div>
      <Space>
        <Button>Reset</Button>
        <Button type="primary">Search</Button>
      </Space>
    </div>
  );
};

export default BookSearch;
