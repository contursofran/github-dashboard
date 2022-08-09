import { Avatar, Navbar as MantineNavbar, Stack, Text } from "@mantine/core";
import {
  IconBrandGithub,
  IconHome,
  IconLogout,
  IconSettings,
} from "@tabler/icons";
import { useState } from "react";
import Link from "next/link";
import { useStyles } from "./Navbar.styles";
import { useRouter } from "next/router";
import { upperFirst } from "@mantine/hooks";

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

  {
    link: "/settings",
    label: "Settings",
    icon: IconSettings,
  },
];

function Navbar() {
  const { classes, cx } = useStyles();
  const { route } = useRouter();
  const [active, setActive] = useState(
    route === "/" ? "Home" : upperFirst(route.split("/")[1])
  );

  console.log(active);
  const links = data.map((item) => (
    <Link href={item.link} key={item.label} passHref>
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
    <MantineNavbar width={{ sm: 300 }} p={"sm"} className={classes.navbar}>
      <MantineNavbar.Section grow mt="xl">
        <Stack className={classes.header}>
          <Avatar
            src={
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
            }
            size={80}
            radius={120}
            mx="auto"
          />
          <Text align="center" size="lg" weight={500}>
            {"John Doe"}
          </Text>
          <Text align="center" color="dimmed" size="sm" mt="-sm">
            {"johndow@gmail.com"}
          </Text>
        </Stack>
        {links}
      </MantineNavbar.Section>
      <MantineNavbar.Section className={classes.footer}>
        <MantineNavbar.Section>
          <a
            href="#"
            className={classes.link}
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
