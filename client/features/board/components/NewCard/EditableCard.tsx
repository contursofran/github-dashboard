import { Card, Group, Textarea, TextInput } from "@mantine/core";
import { useFocusTrap } from "@mantine/hooks";
import { useStyles } from "./EditableCard.styles";

interface Props {
  tag?: string;
  text?: string;
  title?: string;
}

function EditableCard({ tag, text, title }: Props) {
  const { classes } = useStyles();
  const focusTrapRef = useFocusTrap();

  return (
    <>
      <Card
        withBorder
        className={classes.root}
        p="md"
        radius="md"
        ref={focusTrapRef}
        shadow="md"
      >
        <Group>
          <Group position="apart">
            <div className={classes.titleTag}>
              <TextInput
                aria-label="Title"
                className={classes.title}
                placeholder={title ? title : "Title"}
                size="xs"
              />
              <TextInput
                aria-label="Tag"
                className={classes.tag}
                placeholder={tag ? tag : "Tag"}
                size="xs"
              />
            </div>
          </Group>

          <Textarea
            aria-label="Text"
            className={classes.textArea}
            placeholder={text ? text : "Text"}
          />
        </Group>
      </Card>
    </>
  );
}
export { EditableCard };
