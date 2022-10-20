import { createStyles } from "@mantine/core";

const calendarColors = {
  green: {
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
  },
  blue: {
    dark: {
      NONE: "#1A1B1E",
      FIRST_QUARTILE: "#0e3144",
      SECOND_QUARTILE: "#00526b",
      THIRD_QUARTILE: "#2680a6",
      FOURTH_QUARTILE: "#58b3f9",
    },
    light: {
      NONE: "#f5f6f8",
      FIRST_QUARTILE: "hsl(209, 66%, 16%)",
      SECOND_QUARTILE: "hsl(209, 66%, 16%)",
      THIRD_QUARTILE: "hsl(209, 66%, 16%)",
      FOURTH_QUARTILE: "hsl(209, 66%, 16%)",
    },
  },
};

const useStyles = createStyles((theme) => ({
  card: {
    width: "100%",
    minWidth: "900px",
    height: "100%",
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
  swatches: {
    height: 15,
    width: 15,
    borderRadius: 3,
  },
}));

export { useStyles, calendarColors };
