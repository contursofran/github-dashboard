import { Avatar, Navbar, Stack, Tooltip } from "@mantine/core";
import { IconLogout, IconSettings } from "@tabler/icons";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { guestUser } from "../../../utils/data";
import { Login } from "../../Login";
import { useStyles } from "../Navbar.styles";

interface NavbarCollapsedProps {
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

function NavbarCollapsed(props: NavbarCollapsedProps) {
  const { classes, cx } = useStyles();
  const { active, getLinks, login, loginHandler, session, setActive } = props;

  return (
    <>
      <Navbar
        className={classes.navbar}
        p={"sm"}
        style={{ alignItems: "center" }}
        width={{ base: 70 }}
      >
        <Navbar.Section grow mt="xl">
          <Stack className={classes.header}>
            <Tooltip
              label={session?.user?.name || guestUser.user.name}
              position="top-end"
            >
              <Avatar
                mx="auto"
                radius={120}
                size={35}
                src={
                  session?.user?.image
                    ? session?.user?.image
                    : guestUser.user.avatar_url
                }
              />
            </Tooltip>
          </Stack>
          {getLinks(false)}
        </Navbar.Section>
        <Navbar.Section className={classes.footer}>
          <Navbar.Section style={{ cursor: "pointer" }}>
            <Link passHref href={"/settings"}>
              <Tooltip label="Settings" position="right">
                <a
                  className={cx(classes.link, {
                    [classes.linkActive]: "Settings" === active,
                  })}
                  onClick={() => setActive("Settings")}
                >
                  <IconSettings
                    className={classes.linkIcon}
                    size={24}
                    stroke={1.5}
                  />
                </a>
              </Tooltip>
            </Link>
          </Navbar.Section>
          <Navbar.Section>
            <Tooltip label="Logout" position="right">
              <a
                className={classes.link}
                href="#"
                onClick={
                  session?.user ? () => signOut() : () => loginHandler.open()
                }
              >
                <IconLogout
                  className={classes.linkIcon}
                  size={24}
                  stroke={1.5}
                />
              </a>
            </Tooltip>
          </Navbar.Section>
        </Navbar.Section>
      </Navbar>
      <Login close={loginHandler.close} opened={login} />
    </>
  );
}

export { NavbarCollapsed };
