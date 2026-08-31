import { useState } from "react";
import UsersSearch from "./users.search";
import UsersTable from "./users.table";
import { getUserPaginate } from "@/services/user.api";

const UsersPageAdmin = () => {
  const [data, setData] = useState<IUserTable[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [current, setCurrent] = useState<number>(1);

  const [searchObject, setSearchObject] = useState<IUserSearchField>({
    fullName: "",
    email: "",
    createdAt: [],
  });

  const [tableLoading, setTableLoading] = useState<boolean>(false);

  const [sort, setSort] = useState<ISort>({
    name: "",
    type: "",
  });

  const fetchUser = async (
    current: number,
    pageSize: number,
    fullName: string = "",
    email: string = "",
    createdAt: string[] = [],
    sort: ISort = { name: "", type: "" },
  ) => {
    setTableLoading(true);

    const res = await getUserPaginate(
      current,
      pageSize,
      fullName,
      email,
      createdAt,
      sort,
    );

    if (res.data) {
      setTotal(res.data.meta.total);
      setData(res.data.result);
      setTableLoading(false);
    }
  };
  return (
    <>
      <UsersSearch
        fetchUser={fetchUser}
        pageSize={pageSize}
        setCurrent={setCurrent}
        setSearchObject={setSearchObject}
        sort={sort}
      />
      <UsersTable
        fetchUser={fetchUser}
        data={data}
        total={total}
        tableLoading={tableLoading}
        pageSize={pageSize}
        setPageSize={setPageSize}
        current={current}
        setCurrent={setCurrent}
        searchObject={searchObject}
        setSort={setSort}
        sort={sort}
      />
    </>
  );
};

export default UsersPageAdmin;
