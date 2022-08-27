import { Button, Modal } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import GithubIcon from "../../../public/github.png";
import { useStore } from "../../store";
import { useStyles } from "./Home.styles";

function Home() {
  const [opened, setOpened] = useState(true);
  const { classes } = useStyles();
  const { data, status } = useSession();
  console.log(data);

  useEffect(() => {
    useStore.setState({ currentPage: "Home" });
  }, []);

  return (
    <>
      <Modal centered opened={opened} onClose={() => setOpened(false)}>
        <div className={classes.container}>
          <div className={classes.img}>
            <Image alt="github" layout="fill" src={GithubIcon} />
          </div>
          Please continue with your GitHub account.
          <Button
            classNames={{
              label: classes.buttonLabel,
              icon: classes.buttonIcon,
              root: classes.buttonRoot,
            }}
            color="dark.9"
            leftIcon={<IconBrandGithub />}
            onClick={() => signIn("github")}
          >
            Continue with GitHub
          </Button>
        </div>
      </Modal>
    </>
  );
}

export { Home };
