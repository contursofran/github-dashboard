import { Button, Modal } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons";
import { signIn } from "next-auth/react";
import Image from "next/image";
import GithubIcon from "../../../public/github.png";
import GithubIconDark from "../../../public/githubDark.png";

import { useStyles } from "./Login.styles";

interface LoginProps {
  close: () => void;
  opened: boolean;
}

function Login({ close, opened }: LoginProps) {
  const { classes, theme } = useStyles();

  return (
    <Modal
      centered
      opened={opened}
      overlayBlur={3}
      styles={{
        close: {
          alignItems: "start",
          "&:hover": {
            backgroundColor: "transparent",
            color: theme.colorScheme === "dark" ? "#fff" : "#000",
          },
        },
      }}
      onClose={close}
    >
      <div className={classes.container}>
        {theme.colorScheme === "dark" ? (
          <div className={classes.img}>
            <Image alt="github" layout="fill" src={GithubIcon} />
          </div>
        ) : (
          <div className={classes.img}>
            <Image alt="github" layout="fill" src={GithubIconDark} />
          </div>
        )}
        Please continue with your GitHub account.
        <Button
          className={classes.hover}
          classNames={{
            root: classes.root,
          }}
          leftIcon={<IconBrandGithub />}
          onClick={() => signIn("github", { redirect: true, callbackUrl: "/" })}
        >
          Continue with GitHub
        </Button>
      </div>
    </Modal>
  );
}

export { Login };
