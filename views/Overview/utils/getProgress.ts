import { Features, Issues, Tasks } from "@prisma/client";

export const getProgress = (array: Features[] | Issues[] | Tasks[]) => {
  const total = array.length;

  if (total === 0) {
    return {
      completed: 0,
      incomplete: 0,
      percentage: 0,
    };
  }

  const completed = array.filter((item) => item.type === "Done").length;
  const percentage = Math.round((completed / total) * 100);
  return {
    percentage: percentage,
    completed: completed,
    incomplete: total - completed,
  };
};
