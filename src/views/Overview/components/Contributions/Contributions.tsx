import { Card, Group, Text, Title, useMantineTheme } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { displayContributions, getMonth } from "../../helpers/formatDates";
import { getColor } from "../../helpers/getColor";
import { useContributions, WEEK_LABELS } from "../../hooks/useContributions";
import { useStyles } from "./Contributions.styles";
import { ContributionsSkeleton } from "./ContributionsSkeleton";

function Contributions() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [cardWidth, setCardWidth] = useState(1078);
  const { ref, width } = useElementSize();
  const { contributionLevels, data, getMonthPosition, monthData, weekData } =
    useContributions();

  useEffect(() => {
    if (width) {
      setCardWidth(width);
    }
  }, [width]);

  if (!data) {
    return <ContributionsSkeleton />;
  }

  return (
    <Card withBorder className={classes.card} p="lg" radius="md" ref={ref}>
      <Title pb={25} size={18}>
        Total contributions
      </Title>
      <svg width={"100%"}>
        {monthData?.map(
          (month, index) =>
            index < 12 && (
              <text
                fill={theme.colors.gray[4]}
                fontSize={14}
                key={index}
                x={getMonthPosition(index, cardWidth, 55 + 1200 / cardWidth)}
                y={16}
              >
                {getMonth(index)}
              </text>
            )
        )}
        {WEEK_LABELS.map((label, index) => (
          <text
            fill={theme.colors.gray[4]}
            fontSize={14}
            key={index}
            x={0}
            y={60 + 40 * index}
          >
            {label}
          </text>
        ))}
        {weekData?.map((week, index) =>
          week.contributionDays.map((day) => (
            <rect
              fill={getColor(day.contributionLevel, theme)}
              height={cardWidth / 76}
              key={day.date}
              rx="2"
              ry="2"
              width={cardWidth / 76}
              x={50 + (index * cardWidth) / (55 + 1200 / cardWidth)}
              y={30 + day.weekday * 20}
            >
              <title>{displayContributions(day)}</title>
            </rect>
          ))
        )}
      </svg>

      <Group mr={10} mt={15} position="right">
        <Text color="gray" size="md">
          Less
        </Text>
        <Group spacing={10}>
          {contributionLevels.map((level, index) => (
            <div
              className={classes.swatches}
              key={level + index}
              style={{
                backgroundColor: getColor(level, theme),
              }}
            />
          ))}
        </Group>
        <Text color="gray" size="md">
          More
        </Text>
      </Group>
    </Card>
  );
}

export { Contributions };
