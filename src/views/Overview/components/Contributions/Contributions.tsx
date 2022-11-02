import { Card, Group, Text, Title } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { getTextColor } from "../../../../utils/mantine";
import { displayContributions } from "../../helpers/formatDates";
import { getColor, getLabelColor } from "../../helpers/getColor";
import { useContributions, WEEK_LABELS } from "../../hooks/useContributions";
import { useStyles } from "./Contributions.styles";
import { ContributionsSkeleton } from "./ContributionsSkeleton";

function Contributions() {
  const { classes, theme } = useStyles();
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
    <Card
      withBorder
      className={classes.card}
      p="lg"
      pb={30}
      radius="md"
      ref={ref}
    >
      <Title pb={10} size={18}>
        Total contributions
      </Title>
      <svg height={"70%"} width={"100%"}>
        {monthData?.map(
          (month, index) =>
            index < 12 && (
              <text
                fill={getTextColor(theme)}
                fontSize={14}
                key={index}
                x={getMonthPosition(index, cardWidth, 55 + 1200 / cardWidth)}
                y={16}
              >
                {monthData[index + 1].name}
              </text>
            )
        )}
        {WEEK_LABELS.map((label, index) => (
          <text
            fill={getTextColor(theme)}
            fontSize={14}
            key={index}
            x={0}
            y={62 + 40 * index}
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

      <Group mr={10} mt={20} position="right">
        <Text color={getTextColor(theme)} size="md">
          Less
        </Text>
        <Group spacing={10}>
          {contributionLevels.map((level, index) => (
            <div
              className={classes.swatches}
              key={level + index}
              style={{
                backgroundColor: getLabelColor(level, theme),
              }}
            />
          ))}
        </Group>
        <Text color={getTextColor(theme)} size="md">
          More
        </Text>
      </Group>
    </Card>
  );
}

export { Contributions };
