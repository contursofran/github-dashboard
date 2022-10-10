import {
  Avatar,
  Navbar as MantineNavbar,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { upperFirst, useDisclosure } from "@mantine/hooks";
import {
  IconBook,
  IconBrandGithub,
  IconLogout,
  IconSettings,
} from "@tabler/icons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { guestUser } from "../../utils/data";
import { Login } from "./Login";
import { useStyles } from "./Navbar.styles";

const data = [
  {
    link: "/",
    label: "Overview",
    icon: IconBook,
  },
  {
    link: "/repositories",
    label: "Repositories",
    icon: IconBrandGithub,
  },
];

function Navbar() {
  const { classes, cx } = useStyles();
  const { data: session, status } = useSession();
  const [login, loginHandler] = useDisclosure(false);
  const { route } = useRouter();
  const [active, setActive] = useState(
    route === "/" ? "Overview" : upperFirst(route.split("/")[1])
  );

  const links = data.map((item) =>
    status === "loading" ? (
      <Skeleton height={45} key={item.label} mt={10} />
    ) : (
      <Link passHref href={item.link} key={item.label}>
        <a
          className={cx(classes.link, {
            [classes.linkActive]: item.label === active,
          })}
          onClick={() => setActive(item.label)}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </a>
      </Link>
    )
  );

  if (status === "loading") {
    return (
      <MantineNavbar className={classes.navbar} p={"sm"} width={{ sm: 300 }}>
        <MantineNavbar.Section grow mt="xl">
          <Stack align="center" className={classes.header} justify="center">
            <Skeleton circle height={80} />
            <Skeleton height={25} radius="sm" />
            <Skeleton height={25} radius="sm" />
          </Stack>
          {links}
        </MantineNavbar.Section>
        <MantineNavbar.Section className={classes.footer}>
          <MantineNavbar.Section>
            <Skeleton height={45} />
          </MantineNavbar.Section>
          <MantineNavbar.Section>
            <Skeleton height={45} mt={15} />
          </MantineNavbar.Section>
        </MantineNavbar.Section>
      </MantineNavbar>
    );
  }

  return (
    <>
      <MantineNavbar className={classes.navbar} p={"sm"} width={{ sm: 300 }}>
        <MantineNavbar.Section grow mt="xl">
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
              {status === "unauthenticated"
                ? guestUser.user.name
                : session?.user?.name}
            </Text>
            <Text align="center" color="dimmed" mt="-sm" size="sm">
              {status === "unauthenticated"
                ? guestUser.user.email
                : session?.user?.email}
            </Text>
          </Stack>
          {links}
        </MantineNavbar.Section>
        <MantineNavbar.Section className={classes.footer}>
          <MantineNavbar.Section>
            <Link passHref href={"/settings"}>
              <a
                className={cx(classes.link, {
                  [classes.linkActive]: "Settings" === active,
                })}
                onClick={() => setActive("Settings")}
              >
                <IconSettings className={classes.linkIcon} stroke={1.5} />
                <span>Settings</span>
              </a>
            </Link>
          </MantineNavbar.Section>
          <MantineNavbar.Section>
            <a
              className={classes.link}
              href="#"
              onClick={
                session?.user ? () => signOut() : () => loginHandler.open()
              }
            >
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>{session?.user ? "Logout" : "Login"}</span>
            </a>
          </MantineNavbar.Section>
        </MantineNavbar.Section>
      </MantineNavbar>
      <Login close={loginHandler.close} opened={login} />
    </>
  );
}

export { Navbar };
