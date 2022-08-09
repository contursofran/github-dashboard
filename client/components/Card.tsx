import {
  Card as MantineCard,
  Text,
  Group,
  createStyles,
  ColorSwatch,
  useMantineTheme,
  ChevronIcon,
  ActionIcon,
} from "@mantine/core";
import { IconChevronRight, IconChevronsRight } from "@tabler/icons";

interface Props {
  title: string;
  text: string;
  language: string;
  languageColor: string;
  lastUpdated: string;
  badge: string;
}

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: "#141517",
    width: "450px",
    "&:hover": {
      borderColor: theme.colors.blue[4],
      cursor: "pointer",
    },

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      width: "400px",
    },

    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      width: "300px",
    },
  },
  title: {
    fontSize: "1.1rem",
  },
  swatch: {
    width: "0.6rem",
    height: "0.6rem",
    marginRight: "-0.3rem",
  },
}));

function Card({ title, text, language, languageColor, lastUpdated }: Props) {
  const { classes } = useStyles();
  const { colors } = useMantineTheme();
  return (
    <MantineCard
      onClick={() => console.log("e")}
      className={classes.root}
      shadow="md"
      p="lg"
      radius="md"
      withBorder
    >
      <Group mb="xs">
        <Text size={"lg"} color="blue.4">
          {title}
        </Text>
      </Group>
      <Text size="md" color="dimmed">
        {text}
      </Text>

      <Group pt={"md"} position="apart">
        <Group align="center" position="center">
          <ColorSwatch
            color={colors[languageColor][5]}
            className={classes.swatch}
          />
          <Text size="sm" color="dimmed">
            {language}
          </Text>
        </Group>
        <Text size="sm" color="dimmed">
          {lastUpdated}
        </Text>
      </Group>
    </MantineCard>
  );
}

export { Card };
