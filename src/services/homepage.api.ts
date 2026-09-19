import instance1 from "./axios.customize";

const getBooksHomepage = (
  current: number,
  pageSize: number,
  sort: ISort,
  categoryList: string[],
) => {
  const defaultUrl = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
  const querySort =
    sort.name === ""
      ? ""
      : `&sort=${sort.type === "asc" ? "" : "-"}${sort.name}`;
  const queryCategory =
    categoryList.length === 0 ? "" : `&category=${categoryList.join()}`;

  const url = defaultUrl + querySort + queryCategory;

  return instance1.get<unknown, IBackendResponse<IDataPaginate<IBookTable>>>(
    url,
  );
};

export { getBooksHomepage };
