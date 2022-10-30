import { Button, Modal, useMantineTheme } from "@mantine/core";
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
  const { classes } = useStyles();
  const { colorScheme } = useMantineTheme();

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
            color: "white",
          },
        },
      }}
      onClose={close}
    >
      <div className={classes.container}>
        {colorScheme === "dark" ? (
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
          onClick={() => signIn("github")}
        >
          Continue with GitHub
        </Button>
      </div>
    </Modal>
  );
}

export { Login };
