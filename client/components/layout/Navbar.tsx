import { Avatar, Navbar as MantineNavbar, Stack, Text } from "@mantine/core";
import { createStyles } from "@mantine/core";
import {
  IconBrandGithub,
  IconHome,
  IconLogout,
  IconSettings,
} from "@tabler/icons";
import { useState } from "react";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");

  return {
    navbar: {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      border: "none",
    },
    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.gray[4]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },
    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.gray[4]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },
    footer: {
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
      paddingTop: theme.spacing.md,
    },
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },
  };
});

const data = [
  {
    link: "",
    label: "Home",
    icon: IconHome,
  },
  {
    link: "",
    label: "Repositories",
    icon: IconBrandGithub,
  },

  {
    link: "",
    label: "Settings",
    icon: IconSettings,
  },
];

function Navbar() {
  const { classes } = useStyles();

  const [active, setActive] = useState("Projects");

  const links = data.map((item) => (
    <a
      href={item.link}
      className={classes.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
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
