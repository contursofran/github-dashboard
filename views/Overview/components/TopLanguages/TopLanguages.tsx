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
import { useEffect, useState } from "react";
import { trpc } from "../../../../utils/trpc";
import { Language } from "../../types/github";
import { filterLanguages } from "../../utils/filterLanguages";
import { useStyles } from "./TopLanguages.styles";
import { TopLanguagesSkeleton } from "./TopLanguagesSkeleton";

export interface LanguageArray extends Language {
  percentage?: number;
  size: number;
}

function TopLanguages({ username }: { username: string | undefined }) {
  const { classes } = useStyles();
  const { colors } = useMantineTheme();
  const [languages, setLanguages] = useState<LanguageArray[]>([]);
  const { data } = trpc.useQuery(["github.getUserTopLanguages", { username }]);

  useEffect(() => {
    if (data) {
      setLanguages(filterLanguages(data));
    }
  }, [data]);

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
              color: colors.blue[4],
              tooltip: languages[0]?.name,
            },
            {
              value: languages[1].percentage ? languages[1].percentage : 0,
              color: colors.blue[7],
              tooltip: languages[1]?.name,
            },
            {
              value: languages[2].percentage ? languages[2].percentage : 0,
              color: colors.blue[8],
              tooltip: languages[2]?.name,
            },
            {
              value: languages[3].percentage ? languages[3].percentage : 0,
              color: colors.blue[9],
              tooltip: languages[3]?.name,
            },
          ]}
          size={7}
        />
        <SimpleGrid cols={2} spacing="xs">
          {languages.map((language, index) => (
            <Group key={language.name}>
              <ColorSwatch
                color={index === 0 ? colors.blue[4] : colors.blue[index + 6]}
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
