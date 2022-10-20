import { Card, ColorSwatch, Group, Text, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import { primaryColorShade } from "../../../../utils/mantine";
import { useStyles } from "./Repository.styles";

interface Props {
  description: string | null;
  language: string | null;
  name: string;
  pushed_at: string | null;
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

function Repository({
  description,
  language,
  name,
  pushed_at,
  visibility,
}: Props) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const link = `/repositories/${visibility?.toLowerCase()}/${name}/features`;

  const getLanguageColor = () => {
    if (language && languageColors[language]) {
      return theme.colors[languageColors[language]][5];
    }
    return "gray";
  };

  const getUpdated = (pushed_at: string) => {
    const date = new Date(pushed_at);
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
    <Link passHref href={link} key={name}>
      <Card withBorder className={classes.root} p="lg" radius="md" shadow="md">
        <Group mb="xs">
          <Text color={primaryColorShade(theme)} size={"lg"}>
            {name}
          </Text>
        </Group>
        <Text className={classes.text} color="dimmed" size="md">
          {description ? description : "No description"}
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
            {pushed_at ? getUpdated(pushed_at) : ""}
          </Text>
        </Group>
      </Card>
    </Link>
  );
}

export { Repository };
