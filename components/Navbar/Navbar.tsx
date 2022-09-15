import {
  Avatar,
  Navbar as MantineNavbar,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { upperFirst, useDisclosure } from "@mantine/hooks";
import {
  IconBrandGithub,
  IconHome,
  IconLogout,
  IconSettings,
} from "@tabler/icons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Login } from "./Login";
import { useStyles } from "./Navbar.styles";

const data = [
  {
    link: "/",
    label: "Home",
    icon: IconHome,
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
    route === "/" ? "Home" : upperFirst(route.split("/")[1])
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

  return (
    <>
      <MantineNavbar className={classes.navbar} p={"sm"} width={{ sm: 300 }}>
        <MantineNavbar.Section grow mt="xl">
          <Stack className={classes.header}>
            <Avatar mx="auto" radius={120} size={80} src={session?.user?.image}>
              {status === "unauthenticated" ? (
                ""
              ) : (
                <Skeleton circle height={80} />
              )}
            </Avatar>
            <Text align="center" size="lg" weight={500}>
              {status === "unauthenticated"
                ? "Invited"
                : session?.user?.name || <Skeleton height={20} radius="sm" />}
            </Text>
            <Text align="center" color="dimmed" mt="-sm" size="sm">
              {status === "unauthenticated"
                ? "invited@email.com"
                : session?.user?.email || (
                    <Skeleton height={20} mt={15} radius="sm" />
                  )}
            </Text>
          </Stack>
          {links}
        </MantineNavbar.Section>
        <MantineNavbar.Section className={classes.footer}>
          <MantineNavbar.Section>
            {status === "loading" ? (
              <Skeleton height={45} />
            ) : (
              <a
                className={classes.link}
                href="#"
                onClick={(event) => event.preventDefault()}
              >
                <IconSettings className={classes.linkIcon} stroke={1.5} />
                <span>Settings</span>
              </a>
            )}
          </MantineNavbar.Section>
          <MantineNavbar.Section>
            {status === "loading" ? (
              <Skeleton height={45} mt={15} />
            ) : (
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
            )}
          </MantineNavbar.Section>
        </MantineNavbar.Section>
      </MantineNavbar>
      <Login close={loginHandler.close} opened={login} />
    </>
  );
}

export { Navbar };
