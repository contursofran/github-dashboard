export const getDate = (date: string) => {
  const now = new Date();
  const eventDate = new Date(date);
  const diff = now.getTime() - eventDate.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }

  return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
};

export const getMonth = (index: number) => {
  const currentMonth = new Date().getMonth() + 1;
  const month = currentMonth + index;
  const monthString = new Date(0, month).toLocaleString("default", {
    month: "short",
  });

  return monthString;
};
