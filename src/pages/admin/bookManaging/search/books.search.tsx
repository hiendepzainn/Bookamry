import { Button, Input, Space } from "antd";

interface IProps {
  searchObject: IBookSearchField;
  setSearchObject: (value: IBookSearchField) => void;
  fetchBooks: (
    current: number,
    pageSize: number,
    mainText: string,
    author: string,
  ) => void;

  pageSize: number;
  setCurrent: (value: number) => void;
}

const BookSearch = (props: IProps) => {
  const { searchObject, setSearchObject, fetchBooks, pageSize, setCurrent } =
    props;

  const handleSearch = async () => {
    //fetch books
    await fetchBooks(1, pageSize, searchObject.mainText, searchObject.author);
    setCurrent(1);
  };

  const handleReset = async () => {
    await fetchBooks(1, pageSize, "", "");
    setCurrent(1);
    setSearchObject({ author: "", mainText: "" });
  };

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
        <Input
          value={searchObject.mainText}
          style={{ width: "40%", marginRight: "20px" }}
          onChange={(e) => {
            setSearchObject({
              mainText: e.target.value,
              author: searchObject.author,
            });
          }}
        />

        <span style={{ marginRight: "10px" }}>Tác giả:</span>
        <Input
          value={searchObject.author}
          style={{ width: "40%" }}
          onChange={(e) => {
            setSearchObject({
              mainText: searchObject.mainText,
              author: e.target.value,
            });
          }}
        />
      </div>

      <Space>
        <Button onClick={handleReset}>Reset</Button>
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
      </Space>
    </div>
  );
};

export default BookSearch;
