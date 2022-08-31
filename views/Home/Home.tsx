import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { Login } from "../../components/Navbar/Login";
import { useStore } from "../../store";
import { useStyles } from "./Home.styles";

function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    useStore.setState({ currentPage: "Home" });
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      {session?.user
        ? `Welcome back ${session.user}`
        : "Welcome please sign in"}
    </>
  );
}

export { Home };
