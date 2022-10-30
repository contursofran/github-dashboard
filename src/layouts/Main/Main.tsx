import { ScrollArea } from "@mantine/core";
import { Header } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
import { Tab } from "../../components/Tabs";
import { useSupportedScreenSize } from "../../hooks/useSupportedScreenSize";
import { useStyles } from "./Main.styles";

interface Props {
  children: React.ReactNode;
  tabs?: Tab[];
}

function Main({ children, tabs }: Props) {
  const { classes } = useStyles();
  useSupportedScreenSize();

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.body}>
        <Header tabs={tabs} />
        <ScrollArea
          classNames={{
            scrollbar: classes.scrollBar,
            thumb: classes.scrollBarThumb,
            root: classes.scrollArea,
            viewport: classes.scrollAreaViewport,
          }}
          id="scrollArea"
          style={{
            height: "calc(100vh )",
          }}
          type="always"
        >
          {children}
        </ScrollArea>
      </div>
    </div>
  );
}

export { Main };
