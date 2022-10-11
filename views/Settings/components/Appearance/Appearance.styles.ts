import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    width: "300px",
    height: "200px",
  },
  cardDark: {
    backgroundColor: "#111112",
  },
  cardLight: {
    backgroundColor: "#dfdfdf",
  },
  activeTheme: {
    border: `1px solid ${theme.colors.blue[4]}`,
  },
  cardSystem: {
    background: "linear-gradient(90deg, #dfdfdf 50%, #111112 50%)",
  },
  navbar: {
    width: "30%",
    height: "100%",
    borderTopLeftRadius: 10,
    padding: 10,
  },
  skeletonCircle: {
    height: 30,
    width: 30,
    borderRadius: "50%",
  },
  skeletonText: {
    height: 7,
    borderRadius: 5,
    width: "100%",
  },
  skeletonColorDark: {
    backgroundColor: "#373a40",
  },
  skeletonColorLight: {
    backgroundColor: "#dee2e6",
  },
  skeletonColorSystem: {
    background: "linear-gradient(90deg, #dee2e6 20%, #373a40 20%)",
  },
  block: {
    width: "70%",
    height: "100%",
    borderTopRightRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    padding: 10,
  },
  blockDark: {
    backgroundColor: "#1a1b1e",
  },
  blockLight: {
    backgroundColor: "#ffffff",
  },
  blockSystem: {
    background: "linear-gradient(90deg, #ffffff 29%, #1a1b1e 29%)",
  },
  skeletonRect: {
    height: "25%",
    width: "80%",
    borderRadius: 5,
  },
}));

export { useStyles };
