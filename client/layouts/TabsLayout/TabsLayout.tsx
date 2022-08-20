import { Header } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
import { Tab } from "../../components/Tabs";
import { useStyles } from "./TabsLayout.styles";

interface Props {
  children: React.ReactNode;
  tabs: Tab[];
}

function TabsLayout({ children, tabs }: Props) {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.body}>
        <Header tabs={tabs} />

        {children}
      </div>
    </div>
  );
}

export { TabsLayout };
