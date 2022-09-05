import { Card, Stack, Textarea, TextInput } from "@mantine/core";
import { useClickOutside, useFocusTrap } from "@mantine/hooks";
import { Type } from "@prisma/client";
import { IconTrash } from "@tabler/icons";
import { useState } from "react";
import { useCard } from "../../hooks/useCard";
import { useStyles } from "./EditableCard.styles";

interface Props {
  newCard: boolean;
  setEditingCard: (arg0: boolean) => void;
  tag?: string;
  text?: string;
  title?: string;
  type: Type;
}

function EditableCard({
  newCard,
  setEditingCard,
  tag = "",
  text = "",
  title = "",
  type,
}: Props) {
  const { classes } = useStyles();
  const focusTrapRef = useFocusTrap();
  const ref = useClickOutside(() => handleClickOutside());
  const [tagForm, setTagForm] = useState(tag);
  const [titleForm, setTitleForm] = useState(title);
  const [textForm, setTextForm] = useState(text);
  const { createCardMutation, selectedProject } = useCard();

  const handleClickOutside = () => {
    if (newCard && titleForm?.length > 0) {
      createCardMutation.mutate({
        title: titleForm,
        text: textForm,
        tag: tagForm,
        type: type,
        repositoryName: selectedProject,
      });
    } else if (titleForm) {
      // update card
    }
    setEditingCard(false);
  };

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
              <TextInput
                aria-label="Tag"
                className={classes.tag}
                classNames={{ input: classes.input }}
                placeholder={tag ? tag : "Tag"}
                value={tagForm}
                onChange={(e) => setTagForm(e.currentTarget.value)}
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
