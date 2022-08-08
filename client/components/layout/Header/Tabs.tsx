import { Group } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useStyles } from "./Header.styles";

export interface Tab {
  link: string;
  label: string;
}

function Tabs({ tabs }: { tabs: Tab[] }) {
  const { classes, cx } = useStyles();
  const router = useRouter();
  const [active, setActive] = useState(router.route);

  const mapTabs = (tabs: Tab[]) => {
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

  return tabs && <Group pr={30}>{mapTabs(tabs)}</Group>;
}

export { Tabs };
