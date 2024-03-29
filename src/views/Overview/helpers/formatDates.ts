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

export const getShortDate = (lastUpdated: string) => {
  const date = new Date(lastUpdated);
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const currentYear = new Date().getFullYear();

  if (year === currentYear) {
    return `${month} ${day + 1}`;
  }
  return `${month} ${day}, ${year}`;
};

export const displayContributions = (day: any) => {
  if (day.contributionCount === 0) {
    return "No contributions on " + getShortDate(day.date);
  } else if (day.contributionCount === 1) {
    return day.contributionCount + " contribution on " + getShortDate(day.date);
  } else {
    return (
      day.contributionCount + " contributions on " + getShortDate(day.date)
    );
  }
};
