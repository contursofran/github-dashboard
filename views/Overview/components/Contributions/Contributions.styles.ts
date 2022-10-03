import { createStyles } from "@mantine/core";

const calendarColors = {
  dark: {
    NONE: "#1A1B1E",
    FIRST_QUARTILE: "#0e4429",
    SECOND_QUARTILE: "#006d32",
    THIRD_QUARTILE: "#26a641",
    FOURTH_QUARTILE: "#39d353",
  },
  light: {
    NONE: "#f5f6f8",
    FIRST_QUARTILE: "#9be9a8",
    SECOND_QUARTILE: "#40c463",
    THIRD_QUARTILE: "#30a14e",
    FOURTH_QUARTILE: "#216e39",
  },
};

const useStyles = createStyles((theme) => ({
  card: {
    width: "100%",
    minWidth: "700px",
    height: "220px",
    minHeight: "220px",
    backgroundColor: theme.colors.dark[8],
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(52, auto)",
    gridTemplateRows: "repeat(7, auto)",
    gridGap: "7px",
    padding: "1rem",
  },
  gridItem: {
    backgroundColor: theme.colors.dark[6],
    height: "17px",
    borderRadius: "3px",
    width: "17px",
  },
}));

export { useStyles, calendarColors };
