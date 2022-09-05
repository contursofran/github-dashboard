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
import { Type } from "@prisma/client";
import { IconTrash } from "@tabler/icons";
import { forwardRef, useState } from "react";
import { useStore } from "../../../../store";
import { trpc } from "../../../../utils/trpc";
import { useStyles } from "./EditableCard.styles";

interface Props {
  newCard: boolean;
  setEditingCard: (arg0: boolean) => void;
  tag: string | null;
  text?: string;
  title?: string;
  type: Type;
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

function EditableCard({
  newCard,
  setEditingCard,
  tag,
  text = "",
  title = "",
  type,
}: Props) {
  const { classes } = useStyles();
  const focusTrapRef = useFocusTrap();
  const ref = useClickOutside(() => handleClickOutside());
  const [tagSelect, setTagSelect] = useState<string | null>(tag);
  const [titleForm, setTitleForm] = useState(title);
  const [textForm, setTextForm] = useState(text);
  const selectedTab = useStore((state) => state.selectedTab);
  const selectedProject = useStore((state) => state.selectedProject);
  const createCardMutation = trpc.useMutation([`${selectedTab}.create`]);

  const handleClickOutside = () => {
    if (newCard && titleForm?.length > 0) {
      createCardMutation.mutate({
        title: titleForm,
        text: textForm,
        tag: tagSelect,
        type: type,
        repositoryName: selectedProject,
      });
    } else if (titleForm) {
      // update card
    }
    setEditingCard(false);
  };

  console.log(titleForm);
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
                value={titleForm}
                onChange={(e) => setTitleForm(e.currentTarget.value)}
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
                value={tagSelect}
                onChange={setTagSelect}
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
              value={textForm}
              onChange={(e) => setTextForm(e.currentTarget.value)}
            />
          </Stack>
        </Card>
      </div>
    </>
  );
}

export { EditableCard };
