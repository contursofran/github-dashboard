import {
  Badge,
  Card,
  Group,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useDisclosure, useFocusTrap } from "@mantine/hooks";
import { IconPencil, IconTrash } from "@tabler/icons";
import { forwardRef } from "react";
import { useStyles } from "./EditCard.styles";

interface Props {
  open?: boolean;
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

function EditCard({ open, tag, text, title }: Props) {
  const { classes } = useStyles();
  const focusTrapRef = useFocusTrap();
  const [opened, handlers] = useDisclosure(open ? true : false);

  return (
    <>
      {opened ? (
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
            />
          </Stack>
        </Card>
      ) : (
        <IconPencil size={20} onClick={handlers.open} />
      )}
    </>
  );
}

export { EditCard };
