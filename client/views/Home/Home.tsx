import { useEffect } from "react";
import { useStore } from "../../store";

function Home() {
  useEffect(() => {
    useStore.setState({ currentPage: "Home" });
  }, []);

  return <>Home</>;
}

export { Home };
