import {
  Card,
  ColorSwatch,
  Group,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { guestUser } from "../../../../utils/data";
import { trpc } from "../../../../utils/trpc";
import { filterLanguages } from "../../helpers/filterLanguages";
import { getSwatchColor } from "../../helpers/getColor";
import { Language } from "../../types/github";
import { useStyles } from "./TopLanguages.styles";
import { TopLanguagesSkeleton } from "./TopLanguagesSkeleton";

export interface LanguageArray extends Language {
  percentage?: number;
  size: number;
}

function TopLanguages() {
  const { classes } = useStyles();
  const { status } = useSession();
  const theme = useMantineTheme();
  const [languages, setLanguages] = useState<LanguageArray[]>([]);
  const { data } = trpc.useQuery(["github.getUserTopLanguages"], {
    enabled: status === "authenticated",
  });

  useEffect(() => {
    if (data) {
      const filteredLanguages = filterLanguages(data);
      setLanguages(filteredLanguages);
    }
  }, [data]);

  if (status === "unauthenticated") {
    return (
      <Card withBorder className={classes.card} p="lg" radius="md">
        <Stack justify="space-between" sx={{ height: "100%" }}>
          <Title size={17}>Most used languages</Title>
          <Progress
            classNames={{ root: classes.progress }}
            sections={[
              {
                value: 40,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors[theme.primaryColor][4]
                    : theme.colors[theme.primaryColor][4],
                tooltip: guestUser.stats.topLanguages[0].name,
              },
              {
                value: 20,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors[theme.primaryColor][7]
                    : theme.colors[theme.primaryColor][2],
                tooltip: guestUser.stats.topLanguages[1].name,
              },
              {
                value: 15,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors[theme.primaryColor][8]
                    : theme.colors[theme.primaryColor][1],
                tooltip: guestUser.stats.topLanguages[2].name,
              },
              {
                value: 10,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors[theme.primaryColor][9]
                    : theme.colors[theme.primaryColor][0],
                tooltip: guestUser.stats.topLanguages[3].name,
              },
            ]}
            size={7}
          />
          <SimpleGrid cols={2} spacing="xs">
            {guestUser.stats.topLanguages.map((language, index) => (
              <Group key={guestUser.stats.topLanguages[index].name}>
                <ColorSwatch color={getSwatchColor(theme, index)} size={10} />
                <Text color="dimmed" size="sm">
                  {guestUser.stats.topLanguages[index].name +
                    " " +
                    guestUser.stats.topLanguages[index].value +
                    "%"}
                </Text>
              </Group>
            ))}
            <Group>
              <ColorSwatch color={getSwatchColor(theme, 10)} size={12} />
              <Text color="dimmed">{"Others"}</Text>
            </Group>
          </SimpleGrid>
        </Stack>
      </Card>
    );
  }

  if (languages.length === 0 || !data) {
    return <TopLanguagesSkeleton />;
  }

  return (
    <Card withBorder className={classes.card} p="lg" radius="md">
      <Stack justify="space-between" sx={{ height: "100%" }}>
        <Title size={17}>Most used languages</Title>
        <Progress
          classNames={{ root: classes.progress }}
          sections={[
            {
              value: languages[0].percentage ? languages[0].percentage : 0,
              color: theme.colors[theme.primaryColor][4],
              tooltip: languages[0]?.name,
            },
            {
              value: languages[1].percentage ? languages[1].percentage : 0,
              color:
                theme.colorScheme === "dark"
                  ? theme.colors[theme.primaryColor][7]
                  : theme.colors[theme.primaryColor][2],
              tooltip: languages[1]?.name,
            },
            {
              value: languages[2].percentage ? languages[2].percentage : 0,
              color:
                theme.colorScheme === "dark"
                  ? theme.colors[theme.primaryColor][8]
                  : theme.colors[theme.primaryColor][1],
              tooltip: languages[2]?.name,
            },
            {
              value: languages[3].percentage ? languages[3].percentage : 0,
              color:
                theme.colorScheme === "dark"
                  ? theme.colors[theme.primaryColor][9]
                  : theme.colors[theme.primaryColor][0],
              tooltip: languages[3]?.name,
            },
          ]}
          size={7}
        />
        <SimpleGrid cols={2} spacing="xs">
          {languages.map((language, index) => (
            <Group key={language.name}>
              <ColorSwatch color={getSwatchColor(theme, index)} size={10} />
              <Text color="dimmed" size="sm">
                {language.name + " " + language.percentage + "%"}
              </Text>
            </Group>
          ))}
          <Group>
            <ColorSwatch color={getSwatchColor(theme, 10)} size={12} />
            <Text color="dimmed">{"Others"}</Text>
          </Group>
        </SimpleGrid>
      </Stack>
    </Card>
  );
}

export { TopLanguages };
