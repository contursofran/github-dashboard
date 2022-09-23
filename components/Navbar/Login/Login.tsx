import { Button, Modal } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons";
import { signIn } from "next-auth/react";
import Image from "next/image";
import GithubIcon from "../../../public/github.png";
import { useStyles } from "./Login.styles";

interface LoginProps {
  close: () => void;
  opened: boolean;
}

function Login({ close, opened }: LoginProps) {
  const { classes } = useStyles();

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
        <div className={classes.img}>
          <Image alt="github" layout="fill" src={GithubIcon} />
        </div>
        Please continue with your GitHub account.
        <Button
          className={classes.hover}
          classNames={{
            root: classes.root,
          }}
          color="dark"
          leftIcon={<IconBrandGithub />}
          variant="outline"
          onClick={() => signIn("github")}
        >
          Continue with GitHub
        </Button>
      </div>
    </Modal>
  );
}

export { Login };
