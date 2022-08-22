import { Avatar, Navbar as MantineNavbar, Stack, Text } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import {
  IconBrandGithub,
  IconHome,
  IconLogout,
  IconSettings,
} from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useStyles } from "./Navbar.styles";

const data = [
  {
    link: "/",
    label: "Home",
    icon: IconHome,
  },
  {
    link: "/repositories/public",
    label: "Repositories",
    icon: IconBrandGithub,
  },
];

function Navbar() {
  const { classes, cx } = useStyles();
  const { route } = useRouter();
  const [active, setActive] = useState(
    route === "/" ? "Home" : upperFirst(route.split("/")[1])
  );

  const links = data.map((item) => (
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
  ));

  return (
    <MantineNavbar className={classes.navbar} p={"sm"} width={{ sm: 300 }}>
      <MantineNavbar.Section grow mt="xl">
        <Stack className={classes.header}>
          <Avatar
            mx="auto"
            radius={120}
            size={80}
            src={
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
            }
          />
          <Text align="center" size="lg" weight={500}>
            {"John Doe"}
          </Text>
          <Text align="center" color="dimmed" mt="-sm" size="sm">
            {"johndow@gmail.com"}
          </Text>
        </Stack>
        {links}
      </MantineNavbar.Section>
      <MantineNavbar.Section className={classes.footer}>
        <MantineNavbar.Section>
          <a
            className={classes.link}
            href="#"
            onClick={(event) => event.preventDefault()}
          >
            <IconSettings className={classes.linkIcon} stroke={1.5} />
            <span>Settings</span>
          </a>
        </MantineNavbar.Section>
        <MantineNavbar.Section>
          <a
            className={classes.link}
            href="#"
            onClick={(event) => event.preventDefault()}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </MantineNavbar.Section>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
}

export { Navbar };
