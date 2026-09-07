import dayjs from "dayjs";

const getStringArrayDateRange = (dateRange: string[]) => {
  const startDate = dayjs(dateRange[0], "YYYY-MM-DD").toDate();
  const endDate = dayjs(dateRange[1], "YYYY-MM-DD").toDate();
  return [startDate.toString(), endDate.toString()];
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-GB").format(new Date(date));
};

const formatPrice = (price: number) => {
  const first = Math.floor(price / 1000);
  let second: string | number = price % 1000;
  if (String(second).length == 1) second = `00` + second;
  if (String(second).length == 2) second = `0` + second;
  return `${first}.${second} đ`;
};

export { getStringArrayDateRange, formatDate, formatPrice };
