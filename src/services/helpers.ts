import dayjs from "dayjs";

const getStringArrayDateRange = (dateRange: string[]) => {
  const startDate = dayjs(dateRange[0], "YYYY-MM-DD").toDate();
  const endDate = dayjs(dateRange[1], "YYYY-MM-DD").toDate();
  return [startDate.toString(), endDate.toString()];
};

export { getStringArrayDateRange };
