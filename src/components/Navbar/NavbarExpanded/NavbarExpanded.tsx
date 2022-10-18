import { Avatar, Center, Navbar, Stack, Text } from "@mantine/core";
import { IconLogout, IconSettings } from "@tabler/icons";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { guestUser } from "../../../utils/data";
import { Login } from "../../Login";
import { useStyles } from "../Navbar.styles";

interface NavbarExpandedProps {
  active: string;
  getLinks: (onlyIcons?: boolean) => JSX.Element[];
  login: boolean;
  loginHandler: {
    readonly close: () => void;
    readonly open: () => void;
    readonly toggle: () => void;
  };
  session: Session | null;
  setActive: (value: string) => void;
}

function NavbarExpanded(props: NavbarExpandedProps) {
  const { classes, cx } = useStyles();
  const { active, getLinks, login, loginHandler, session, setActive } = props;

  return (
    <>
      <Navbar className={classes.navbar} p={"sm"} width={{ xl: 270 }}>
        <Navbar.Section grow mt="xl">
          <Stack className={classes.header}>
            <Avatar
              mx="auto"
              radius={120}
              size={70}
              src={
                session?.user?.image
                  ? session?.user?.image
                  : guestUser.user.avatar_url
              }
            />
            <Text align="center" size="lg" weight={500}>
              {session?.status === "unauthenticated"
                ? guestUser.user.name
                : session?.user?.name}
            </Text>
            <Text align="center" color="dimmed" mt="-sm" size="sm">
              {session?.status === "unauthenticated"
                ? guestUser.user.email
                : session?.user?.email}
            </Text>
          </Stack>
          {getLinks(true)}
        </Navbar.Section>
        <Navbar.Section className={classes.footer}>
          <Navbar.Section>
            <Link passHref href={"/settings"}>
              <a
                className={cx(classes.link, {
                  [classes.linkActive]: "Settings" === active,
                })}
                onClick={() => setActive("Settings")}
              >
                <IconSettings className={classes.linkIcon} stroke={1.5} />
                <span style={{ marginLeft: 7 }}>Settings</span>
              </a>
            </Link>
          </Navbar.Section>
          <Navbar.Section>
            <a
              className={classes.link}
              href="#"
              onClick={
                session?.user ? () => signOut() : () => loginHandler.open()
              }
            >
              <Center>
                <IconLogout className={classes.linkIcon} stroke={1.5} />
              </Center>
              <span style={{ marginLeft: 7 }}>
                {session?.user ? "Logout" : "Login"}
              </span>
            </a>
          </Navbar.Section>
        </Navbar.Section>
      </Navbar>
      <Login close={loginHandler.close} opened={login} />
    </>
  );
}

export { NavbarExpanded };
