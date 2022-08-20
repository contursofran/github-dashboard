import { Group } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStyles } from "./Tabs.styles";

interface Props {
  selectedProject?: string;
  tabs: Tab[];
}

export interface Tab {
  label: string;
  link: string;
}

function Tabs({ selectedProject, tabs }: Props) {
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

  const mapTabs = () => {
    const tabsMap = tabs.map((tab) => (
      <Link passHref href={tab.link} key={tab.label}>
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
