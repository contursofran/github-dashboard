import { Group } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStyles } from "./Header.styles";

interface Props {
  tabs: Tab[];
  selectedProject?: string;
}

export interface Tab {
  link: string;
  label: string;
}

function Tabs({ tabs, selectedProject }: Props) {
  const { classes, cx } = useStyles();
  const { route } = useRouter();
  const [active, setActive] = useState(route);

  useEffect(() => {
    setActive(route);
  }, [route]);

  if (selectedProject) {
    const fixTabs = tabs.map((tab) => {
      return { ...tab, link: tab.link.replace("[project]", selectedProject) };
    });
    tabs = fixTabs;
  }

  const mapTabs = (tabs: Tab[]) => {
    const tabsMap = tabs.map(
      (tab) => (
        console.log(tab.link.split("/").pop()),
        (
          <Link href={tab.link} key={tab.label} passHref>
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
        )
      )
    );

    return tabsMap;
  };

  return tabs && <Group pr={30}>{mapTabs(tabs)}</Group>;
}

export { Tabs };
