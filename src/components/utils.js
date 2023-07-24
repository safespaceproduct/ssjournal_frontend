export const formatDate = (time) => {
  const date = new Date(time);
  const options = {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  };
  const { format } = Intl.DateTimeFormat("en-US", options);
  const [month, day, year] = format(date).replace(",", "").split(" ");
  const formattedDate = `${day} ${month} ${year}`;
  console.log(formattedDate);
  return formattedDate;
};
