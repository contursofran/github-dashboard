import { ActionIcon, Group, MediaQuery, Title } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MenuBurger } from "../../views/Overview/components/MenuBurger";
import { Tab, Tabs } from "../Tabs";
import { useStyles } from "./Header.styles";

interface Props {
  tabs?: Tab[];
}

function Header({ tabs }: Props) {
  const { classes } = useStyles();
  const { pathname, push, query } = useRouter();

  useEffect(() => {
    if (pathname === "/repositories") {
      const visibility = window.localStorage.getItem("visibility");

      if (visibility) {
        push(`/repositories/${visibility}`);
      } else {
        push("/repositories/public");
      }
    }
  }, [pathname, push]);

  const getTitle = () => {
    switch (pathname) {
      case "/repositories/public":
        return "Public repositories";
      case "/repositories/private":
        return "Private repositories";
      case "/":
        return "Overview";
      case "/settings":
        return "Settings";
      default:
        return upperFirst(query.repository as string);
    }
  };

  return (
    <Group align="center" className={classes.header}>
      <Title order={3}>{getTitle()}</Title>
      {tabs && <Tabs tabs={tabs} />}
      {pathname === "/" && (
        <MediaQuery query="(min-width: 1400px)" styles={{ display: "none" }}>
          <ActionIcon color="gray.4" mr={-7} variant="transparent">
            <MenuBurger />
          </ActionIcon>
        </MediaQuery>
      )}
    </Group>
  );
}

export { Header };
