import {
  Card as MantineCard,
  ColorSwatch,
  Group,
  Text,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import { primaryColorShade } from "../../../../utils/mantine";
import { useStyles } from "./Card.styles";

interface Props {
  language: string | null;
  lastUpdated: string | null;
  text: string | null;
  title: string;
  visibility?: string;
}

interface LanguageColors {
  [key: string]: string;
}

const languageColors: LanguageColors = {
  JavaScript: "yellow",
  TypeScript: "blue",
  HTML: "orange",
  CSS: "violet",
  Python: "blue",
  Java: "orange",
  C: "gray",
};

function Card({ language, lastUpdated, text, title, visibility }: Props) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const link = `/repositories/${visibility?.toLowerCase()}/${title}/features`;

  const getLanguageColor = () => {
    if (language && languageColors[language]) {
      return theme.colors[languageColors[language]][5];
    }
    return "gray";
  };

  const getUpdated = (lastUpdated: string) => {
    const date = new Date(lastUpdated);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const currentYear = new Date().getFullYear();

    if (year === currentYear) {
      return `Updated on ${month} ${day}`;
    }
    return `Updated on ${month} ${day}, ${year}`;
  };

  return (
    <Link passHref href={link} key={title}>
      <MantineCard
        withBorder
        className={classes.root}
        p="lg"
        radius="md"
        shadow="md"
      >
        <Group mb="xs">
          <Text color={primaryColorShade(theme)} size={"lg"}>
            {title}
          </Text>
        </Group>
        <Text className={classes.text} color="dimmed" size="md">
          {text ? text : "No description"}
        </Text>

        <Group position="apart" pt={"md"}>
          <Group align="center" position="center">
            <ColorSwatch
              className={classes.swatch}
              color={getLanguageColor()}
            />
            <Text color="dimmed" size="sm">
              {language}
            </Text>
          </Group>
          <Text color="dimmed" size="sm">
            {lastUpdated ? getUpdated(lastUpdated) : ""}
          </Text>
        </Group>
      </MantineCard>
    </Link>
  );
}

export { Card };
