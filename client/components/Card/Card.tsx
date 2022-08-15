import {
  Card as MantineCard,
  Text,
  Group,
  ColorSwatch,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import { useStore } from "../../store";
import { useStyles } from "./Card.styles";

interface Props {
  title: string;
  text: string;
  language: string;
  languageColor: string;
  lastUpdated: string;
  badge: string;
}

function Card({ title, text, language, languageColor, lastUpdated }: Props) {
  const { classes } = useStyles();
  const { colors } = useMantineTheme();
  const link = `/repositories/public/${title}/features`;

  return (
    <Link href={link} key={title} passHref>
      <MantineCard
        onClick={() => {
          useStore.setState({ selectedProject: title });
        }}
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
    </Link>
  );
}

export { Card };
