import { Tooltip } from "@mantine/core";
import { upperFirst, useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconBook, IconBrandGithub, TablerIcon } from "@tabler/icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useStyles } from "./Navbar.styles";
import { NavbarCollapsed } from "./NavbarCollapsed";
import { NavbarExpanded } from "./NavbarExpanded";
import { NavbarSkeleton } from "./NavbarSkeleton";

export interface NavbarLinks {
  icon: TablerIcon;
  label: string;
  link: string;
}

const data: NavbarLinks[] = [
  {
    link: "/",
    label: "Overview",
    icon: IconBook,
  },
  {
    link: "/repositories",
    label: "Repositories",
    icon: IconBrandGithub,
  },
];

function Navbar() {
  const { classes, cx } = useStyles();
  const { data: session, status } = useSession();
  const [login, loginHandler] = useDisclosure(false);
  const largeScreen = useMediaQuery("(min-width: 1560px)");
  const { route } = useRouter();
  const [active, setActive] = useState(
    route === "/" ? "Overview" : upperFirst(route.split("/")[1])
  );

  const getLinks = (showLabels?: boolean) => {
    return data.map((item) => (
      <>
        {showLabels ? (
          <Link passHref href={item.link} key={item.label}>
            <a
              className={cx(classes.link, {
                [classes.linkActive]: item.label === active,
              })}
              onClick={() => setActive(item.label)}
            >
              <item.icon className={classes.linkIcon} size={24} stroke={1.5} />
              <span style={{ marginLeft: 7 }}>{item.label}</span>
            </a>
          </Link>
        ) : (
          <Link passHref href={item.link} key={item.label}>
            <Tooltip label={item.label} position="right">
              <a
                className={cx(classes.link, {
                  [classes.linkActive]: item.label === active,
                })}
                style={{ cursor: "pointer" }}
                onClick={() => setActive(item.label)}
              >
                <item.icon
                  className={classes.linkIcon}
                  size={24}
                  stroke={1.5}
                />
              </a>
            </Tooltip>
          </Link>
        )}
      </>
    ));
  };

  const props = {
    session,
    status,
    active,
    setActive,
    login,
    loginHandler,
  };

  if (status === "loading") {
    return <NavbarSkeleton data={data} />;
  }

  return (
    <>
      {largeScreen ? (
        <NavbarExpanded getLinks={getLinks} {...props} />
      ) : (
        <NavbarCollapsed getLinks={getLinks} {...props} />
      )}
    </>
  );
}

export { Navbar };
