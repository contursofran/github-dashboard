import {
  Card as MantineCard,
  Text,
  Badge,
  Button,
  Group,
  createStyles,
  Title,
  ColorSwatch,
  useMantineTheme,
} from "@mantine/core";

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
    position: "relative",
    width: "50%",
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
      className={classes.root}
      shadow="md"
      p="lg"
      radius="md"
      withBorder
    >
      <Group position="apart" mb="xs">
        <Text size={"lg"} color="blue.4">
          {title}
        </Text>
      </Group>

      <Text size="md" color="dimmed">
        {text}
      </Text>
      <Group pt={"md"}>
        <Group align="center" position="center">
          <ColorSwatch
            color={colors[languageColor][5]}
            className={classes.swatch}
          />
          <Text size="sm" color="dimmed">
            {language}
          </Text>
          <Text size="sm" color="dimmed">
            {lastUpdated}
          </Text>
        </Group>
      </Group>
    </MantineCard>
  );
}

export { Card };
