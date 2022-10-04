import {
  Card,
  ColorSwatch,
  Group,
  Progress,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { trpc } from "../../../../utils/trpc";
import { Language } from "../../types/github";
import { filterLanguages } from "../../utils/filterLanguages";
import { useStyles } from "./TopLanguages.styles";

export interface LanguageArray extends Language {
  percentage?: number;
  size: number;
}

function TopLanguages({ username }: { username: string | undefined }) {
  const { classes } = useStyles();
  const [languages, setLanguages] = useState<LanguageArray[]>([]);
  const { data } = trpc.useQuery(["github.getUserTopLanguages", { username }]);

  useEffect(() => {
    if (data) {
      setLanguages(filterLanguages(data));
    }
  }, [data]);

  if (languages.length === 0 || !data) {
    return (
      <Card withBorder className={classes.card} p="lg" radius="md">
        <Stack justify="space-between" sx={{ height: "100%" }}>
          <Title size={18}>Most used languages</Title>
          <Skeleton height={20} />
          <SimpleGrid cols={2}>
            <Skeleton height={20} width={"50%"} />
            <Skeleton height={20} width={"50%"} />
            <Skeleton height={20} width={"50%"} />
            <Skeleton height={20} width={"50%"} />
            <Skeleton height={20} width={"50%"} />
          </SimpleGrid>
        </Stack>
      </Card>
    );
  }

  return (
    <Card withBorder className={classes.card} p="lg" radius="md">
      <Stack justify="space-between" sx={{ height: "100%" }}>
        <Title size={18}>Most used languages</Title>
        <Progress
          sections={[
            {
              value: languages[0].percentage ? languages[0].percentage : 0,
              color: languages[0]?.color ? languages[0].color : "gray",
              tooltip: languages[0]?.name,
            },
            {
              value: languages[1].percentage ? languages[1].percentage : 0,
              color: languages[1]?.color ? languages[1].color : "gray",
              tooltip: languages[1]?.name,
            },
            {
              value: languages[2].percentage ? languages[2].percentage : 0,
              color: languages[2]?.color ? languages[2].color : "gray",
              tooltip: languages[2]?.name,
            },
            {
              value: languages[3].percentage ? languages[3].percentage : 0,
              color: languages[3]?.color ? languages[3].color : "gray",
              tooltip: languages[3]?.name,
            },
            {
              value: languages[4].percentage ? languages[4].percentage : 0,
              color: languages[4]?.color ? languages[4].color : "gray",
              tooltip: languages[4]?.name,
            },
          ]}
          size={9}
        />
        <SimpleGrid cols={2}>
          {languages.map((language) => (
            <Group key={language.name}>
              <ColorSwatch
                color={language.color ? language.color : "gray"}
                size={12}
              />
              <Text>{language.name + " " + language.percentage + "%"}</Text>
            </Group>
          ))}
          <Group>
            <ColorSwatch color={"#373a40"} size={12} />
            <Text>{"Others"}</Text>
          </Group>
        </SimpleGrid>
      </Stack>
    </Card>
  );
}

export { TopLanguages };
