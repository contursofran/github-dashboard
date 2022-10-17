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
  const { colors, primaryColor } = useMantineTheme();
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
                color: colors[primaryColor][4],
                tooltip: guestUser.stats.topLanguages[0].name,
              },
              {
                value: 20,
                color: colors[primaryColor][7],
                tooltip: guestUser.stats.topLanguages[1].name,
              },
              {
                value: 15,
                color: colors[primaryColor][8],
                tooltip: guestUser.stats.topLanguages[2].name,
              },
              {
                value: 10,
                color: colors[primaryColor][9],
                tooltip: guestUser.stats.topLanguages[3].name,
              },
            ]}
            size={7}
          />
          <SimpleGrid cols={2} spacing="xs">
            {guestUser.stats.topLanguages.map((language, index) => (
              <Group key={guestUser.stats.topLanguages[index].name}>
                <ColorSwatch
                  color={
                    index === 0
                      ? colors[primaryColor][4]
                      : colors[primaryColor][index + 6]
                  }
                  size={10}
                />
                <Text color="dimmed" size="sm">
                  {guestUser.stats.topLanguages[index].name +
                    " " +
                    guestUser.stats.topLanguages[index].value +
                    "%"}
                </Text>
              </Group>
            ))}
            <Group>
              <ColorSwatch color={"#1a1b1e"} size={12} />
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
              color: colors[primaryColor][4],
              tooltip: languages[0]?.name,
            },
            {
              value: languages[1].percentage ? languages[1].percentage : 0,
              color: colors[primaryColor][7],
              tooltip: languages[1]?.name,
            },
            {
              value: languages[2].percentage ? languages[2].percentage : 0,
              color: colors[primaryColor][8],
              tooltip: languages[2]?.name,
            },
            {
              value: languages[3].percentage ? languages[3].percentage : 0,
              color: colors[primaryColor][9],
              tooltip: languages[3]?.name,
            },
          ]}
          size={7}
        />
        <SimpleGrid cols={2} spacing="xs">
          {languages.map((language, index) => (
            <Group key={language.name}>
              <ColorSwatch
                color={
                  index === 0
                    ? colors[primaryColor][4]
                    : colors[primaryColor][index + 6]
                }
                size={10}
              />
              <Text color="dimmed" size="sm">
                {language.name + " " + language.percentage + "%"}
              </Text>
            </Group>
          ))}
          <Group>
            <ColorSwatch color={"#1a1b1e"} size={12} />
            <Text color="dimmed">{"Others"}</Text>
          </Group>
        </SimpleGrid>
      </Stack>
    </Card>
  );
}

export { TopLanguages };
