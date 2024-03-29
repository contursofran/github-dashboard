import {
  Avatar,
  Center,
  Navbar as MantineNavbar,
  Stack,
  Text,
  Tooltip
} from "@mantine/core";
import { upperFirst, useDisclosure } from "@mantine/hooks";
import { NextLink } from "@mantine/next";
import {
  IconBook,
  IconBrandGithub,
  IconLogin,
  IconLogout,
  IconSettings,
  TablerIcon
} from "@tabler/icons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { guestUser } from "../../utils/data";
import { Login } from "../Login";
import { useStyles } from "./Navbar.styles";
import { NavbarSkeleton } from "./NavbarSkeleton";

export interface NavbarLinks {
  icon: TablerIcon;
  label: string;
  link: string;
}

const data: NavbarLinks[] = [
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

  const getLinks = (showLabels?: boolean) => {
    return data.map((item) => (
      <Fragment key={item.label}>
        {showLabels ? (
          <Tooltip
            classNames={{ tooltip: classes.tooltip }}
            key={item.label + "tooltip"}
            label={item.label}
            position="right"
          >
            <NextLink
              passHref
              className={cx(classes.link, {
                [classes.linkActive]: item.label === active,
              })}
              href={item.link}
              key={item.label + "link"}
              style={{ textDecoration: "none" }}
              onClick={() => setActive(item.label)}
            >
              <item.icon className={classes.linkIcon} size={24} stroke={1.5} />
              <span className={classes.linkLabel}>{item.label}</span>
            </NextLink>
          </Tooltip>
        ) : (
          <Link passHref href={item.link} key={"noLabel" + item.label}>
            <a
              className={cx(classes.link, {
                [classes.linkActive]: item.label === active,
              })}
              style={{ cursor: "pointer" }}
              onClick={() => setActive(item.label)}
            >
              <item.icon className={classes.linkIcon} size={24} stroke={1.5} />
            </a>
          </Link>
        )}
      </Fragment>
    ));
  };

  if (status === "loading") {
    return <NavbarSkeleton data={data} />;
  }

  return (
    <>
      <MantineNavbar
        className={classes.navbar}
        p={"sm"}
        width={{ base: 70, xl: 270 }}
      >
        <MantineNavbar.Section grow mt="xl">
          <Stack className={classes.header}>
            <Avatar
              className={classes.avatar}
              mx="auto"
              radius={120}
              src={
                session?.user?.image
                  ? session?.user?.image
                  : guestUser.user.avatar_url
              }
            />
            <Text
              align="center"
              className={classes.userInformation}
              size="lg"
              weight={500}
            >
              {status === "unauthenticated"
                ? guestUser.user.name
                : session?.user?.name}
            </Text>
            <Text
              align="center"
              className={classes.userInformation}
              color="dimmed"
              mt="-sm"
              size="sm"
            >
              {status === "unauthenticated"
                ? guestUser.user.email
                : session?.user?.email}
            </Text>
          </Stack>
          {getLinks(true)}
        </MantineNavbar.Section>
        <MantineNavbar.Section className={classes.footer}>
          <MantineNavbar.Section>
            <Tooltip classNames={{ tooltip: classes.tooltip }} label="Settings">
              <NextLink
                passHref
                className={cx(classes.link, {
                  [classes.linkActive]: "Settings" === active,
                })}
                href={"/settings"}
                style={{ textDecoration: "none" }}
                onClick={() => setActive("Settings")}
              >
                <IconSettings className={classes.linkIcon} stroke={1.5} />
                <span className={classes.linkLabel}>Settings</span>
              </NextLink>
            </Tooltip>
          </MantineNavbar.Section>
          <MantineNavbar.Section>
            <Tooltip
              classNames={{ tooltip: classes.tooltip }}
              label={status === "unauthenticated" ? "Login" : "Logout"}
              position="right"
            >
              <a
                className={classes.link}
                href="#"
                onClick={
                  session?.user ? () => signOut() : () => loginHandler.open()
                }
              >
                <Center>
                  {status === "unauthenticated" ? (
                    <IconLogin className={classes.linkIcon} stroke={1.5} />
                  ) : (
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                  )}
                </Center>
                <span className={classes.linkLabel}>
                  {session?.user ? "Logout" : "Login"}
                </span>
              </a>
            </Tooltip>
          </MantineNavbar.Section>
        </MantineNavbar.Section>
      </MantineNavbar>
      <Login close={loginHandler.close} opened={login} />
    </>
  );
}

export { Navbar };
