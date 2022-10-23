import { ScrollArea } from "@mantine/core";
import { Header } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
import { Tab } from "../../components/Tabs";
import { useSupportedScreenSize } from "../../hooks/useSupportedScreenSize";
import { useStyles } from "./Tabs.styles";

interface Props {
  children: React.ReactNode;
  tabs: Tab[];
}

function Tabs({ children, tabs }: Props) {
  const { classes } = useStyles();
  useSupportedScreenSize();

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.body}>
        <Header tabs={tabs} />
        <div className={classes.content}>
          <ScrollArea
            classNames={{
              scrollbar: classes.scrollBar,
              thumb: classes.scrollBarThumb,
              root: classes.scrollArea,
            }}
            style={{
              height: "calc(100vh - 70px)",
            }}
          >
            {children}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export { Tabs };
