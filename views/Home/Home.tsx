import { Paper } from "@mantine/core";
import { useEffect } from "react";
import { useStore } from "../../store";
import { useGetUserEvents } from "./hooks/useGetUserEvents";

function Home() {
  const { userEvents } = useGetUserEvents();

  useEffect(() => {
    useStore.setState({ currentPage: "Home" });
  }, []);

  return (
    <>
      <Paper withBorder style={{ width: "300px", height: "300px" }}></Paper>
    </>
  );
}

export { Home };
