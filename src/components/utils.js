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
  return formattedDate;
};

export const formatDBDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);
  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
};

export const getTime = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = String(minutes).padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}${ampm}`;
};
