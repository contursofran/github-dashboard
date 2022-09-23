import { Group, Title } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";
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

  // upperFirst(query.repository as string);
  const getTitle = () => {
    switch (pathname) {
      case "/repositories/public":
        return "Public repositories";
      case "/repositories/private":
        return "Private repositories";
      case "/":
        return "Overview";
      default:
        return upperFirst(query.repository as string);
    }
  };

  return (
    <Group align="center" className={classes.header}>
      <Title order={3}>{getTitle()}</Title>
      {tabs && <Tabs tabs={tabs} />}
    </Group>
  );
}

export { Header };
