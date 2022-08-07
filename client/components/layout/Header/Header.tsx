import { Group, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useStyles } from "./Header.styles";

export interface Tabs {
  link: string;
  label: string;
}

interface Props {
  currentPage: string;
  tabs?: Tabs[];
}

function Header({ currentPage, tabs }: Props) {
  const { classes, cx } = useStyles();
  const router = useRouter();
  const [active, setActive] = useState(router.route);

  const mapTabs = (tabs: Tabs[]) => {
    const tabsMap = tabs.map((tab) => (
      <Link href={tab.link} key={tab.label} passHref>
        <a
          className={cx(classes.tabsLinks, {
            [classes.linkActive]: active === tab.link,
          })}
          onClick={() => {
            setActive(tab.link);
          }}
        >
          {tab.label}
        </a>
      </Link>
    ));

    return tabsMap;
  };

  return (
    <Group className={classes.header} position="center" align="center">
      <Stack>
        <Group>
          <Title className={classes.title} order={6}>
            {currentPage.split("/")[0]}{" "}
            <Text className={classes.subTitle} inherit component="span">
              / {currentPage.split("/")[1]}
            </Text>
          </Title>
        </Group>
        <Title order={2}>{currentPage.split("/")[0]}</Title>
      </Stack>
      {tabs && <Group pr={30}>{mapTabs(tabs)}</Group>}
    </Group>
  );
}

export { Header };
