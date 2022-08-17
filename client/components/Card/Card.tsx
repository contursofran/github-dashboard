import {
  Card as MantineCard,
  ColorSwatch,
  Group,
  Text,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import { useStore } from "../../store";
import { useStyles } from "./Card.styles";

interface Props {
  badge: string;
  language: string;
  languageColor: string;
  lastUpdated: string;
  text: string;
  title: string;
}

function Card({ language, languageColor, lastUpdated, text, title }: Props) {
  const { classes } = useStyles();
  const { colors } = useMantineTheme();
  const link = `/repositories/public/${title}/features`;

  return (
    <Link passHref href={link} key={title}>
      <MantineCard
        withBorder
        className={classes.root}
        p="lg"
        radius="md"
        shadow="md"
        onClick={() => {
          useStore.setState({ selectedProject: title });
        }}
      >
        <Group mb="xs">
          <Text color="blue.4" size={"lg"}>
            {title}
          </Text>
        </Group>
        <Text color="dimmed" size="md">
          {text}
        </Text>

        <Group position="apart" pt={"md"}>
          <Group align="center" position="center">
            <ColorSwatch
              className={classes.swatch}
              color={colors[languageColor][5]}
            />
            <Text color="dimmed" size="sm">
              {language}
            </Text>
          </Group>
          <Text color="dimmed" size="sm">
            {lastUpdated}
          </Text>
        </Group>
      </MantineCard>
    </Link>
  );
}

export { Card };
