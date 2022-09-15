import { Group } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStyles } from "./Tabs.styles";

interface Props {
  tabs: Tab[];
}

export interface Tab {
  label: string;
  link: string;
}

function Tabs({ tabs }: Props) {
  const { classes, cx } = useStyles();
  const { query, route } = useRouter();
  const [active, setActive] = useState(route);

  useEffect(() => {
    setActive(route);
  }, [route]);

  if (query.repository) {
    const fixTabs = tabs.map((tab) => {
      return {
        ...tab,
        link: tab.link.replace("[project]", query.repository as string),
      };
    });
    tabs = fixTabs;
  }

  const mapTabs = () => {
    const tabsMap = tabs.map((tab) => (
      <Link
        passHref
        href={{
          pathname: tab.link,
          query: {
            repository: query.repository,
          },
        }}
        key={tab.label}
      >
        <a
          className={cx(classes.tabsLinks, {
            [classes.linkActive]:
              active.split("/").pop() === tab.link.split("/").pop(),
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

  return <Group>{mapTabs()}</Group>;
}

export { Tabs };
