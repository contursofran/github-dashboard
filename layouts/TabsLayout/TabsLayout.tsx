import { Header } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
import { Tab } from "../../components/Tabs";
import { useStyles } from "./TabsLayout.styles";

interface Props {
  children: React.ReactNode;
  currentPage: string;
  tabs: Tab[];
}

function TabsLayout({ children, currentPage, tabs }: Props) {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.body}>
        <Header currentPage={currentPage} tabs={tabs} />

        {children}
      </div>
    </div>
  );
}

export { TabsLayout };
