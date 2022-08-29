import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useStore } from "../../store";
import { Login } from "./components/Login";
import { useStyles } from "./Home.styles";

function Home() {
  const { data: session, status } = useSession();
  useEffect(() => {
    useStore.setState({ currentPage: "Home" });
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return <>{session?.user ? `Welcome back ${session.user}` : <Login />}</>;
  } else {
    return <div>Hi</div>;
  }
}

export { Home };
