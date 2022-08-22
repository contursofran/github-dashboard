import {
  Badge,
  Card,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useClickOutside, useFocusTrap } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons";
import { forwardRef } from "react";
import { useStyles } from "./EditableCard.styles";

interface Props {
  setEditingCard: (arg0: boolean) => void;
  tag?: string;
  text?: string;
  title?: string;
}

interface TagsProps extends React.ComponentPropsWithoutRef<"div"> {
  color: string;
  label: string;
}

const tags = [
  {
    label: "HIGH",
    value: "HIGH",
    color: "red",
  },
  {
    label: "MEDIUM",
    value: "MEDIUM",
    color: "yellow",
  },
  {
    label: "LOW",
    value: "LOW",
    color: "green",
  },
];

// eslint-disable-next-line react/display-name
const SelectTag = forwardRef<HTMLDivElement, TagsProps>(
  ({ color, label, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        <Badge color={color} size="xs" variant="light">
          <Text size="xs" weight={500}>
            {label}
          </Text>
        </Badge>
      </div>
    );
  }
);

function EditableCard({ setEditingCard, tag, text, title }: Props) {
  const { classes } = useStyles();
  const focusTrapRef = useFocusTrap();
  const ref = useClickOutside(() => setEditingCard(false));

  return (
    <>
      <div ref={ref}>
        <Card
          withBorder
          className={classes.root}
          p="md"
          radius="md"
          ref={focusTrapRef}
          shadow="md"
        >
          <Stack spacing="xs">
            <div className={classes.titleTag}>
              <TextInput
                aria-label="Title"
                className={classes.title}
                classNames={{ input: classes.input }}
                placeholder={title ? title : "Title"}
                value={title ? title : ""}
              />
              <Select
                searchable
                className={classes.tag}
                classNames={{
                  dropdown: classes.tagDropdown,
                  input: classes.input,
                }}
                data={tags}
                itemComponent={SelectTag}
                maxDropdownHeight={300}
                placeholder="Tag"
                value={tag ? tag : ""}
              />
              <IconTrash color="gray" size={25} />
            </div>
            <Textarea
              aria-label="Text"
              className={classes.textArea}
              classNames={{
                input: classes.input,
              }}
              placeholder={text ? text : "Text"}
              value={text ? text : ""}
            />
          </Stack>
        </Card>
      </div>
    </>
  );
}

export { EditableCard };
