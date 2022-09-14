import { Card, Stack, Textarea, TextInput } from "@mantine/core";
import { useClickOutside, useFocusTrap } from "@mantine/hooks";
import { Type } from "@prisma/client";
import { IconTrash } from "@tabler/icons";
import { useState } from "react";

import { useCard } from "../../hooks/useCard";
import { useStyles } from "./EditableCard.styles";

interface Props {
  cardId?: string;
  index: number;
  newCard: boolean;
  setEditingCard: (arg0: boolean) => void;
  tag?: string;
  text?: string;
  title?: string;
  type: Type;
}

function EditableCard({
  cardId = "",
  tag = "",
  text = "",
  title = "",
  ...props
}: Props) {
  const { classes } = useStyles();
  const [tagForm, setTagForm] = useState(tag);
  const [titleForm, setTitleForm] = useState(title);
  const [textForm, setTextForm] = useState(text);
  const focusTrapRef = useFocusTrap();
  const ref = useClickOutside(() => handleClickOutside());
  const card = useCard(props.setEditingCard);

  const { index, newCard, type } = props;

  const handleClickOutside = async () => {
    if (newCard && titleForm?.length > 0) {
      card.createCard({
        tagForm: tagForm ? tagForm : "",
        textForm: textForm ? textForm : "",
        titleForm: titleForm,
        cardId,
        index: index,
        type: type,
      });
    } else if (titleForm !== title || textForm !== text || tagForm !== tag) {
      card.updateCard({
        tagForm,
        textForm,
        titleForm,
        cardId,
        index: index,
        type: type,
      });
    } else {
      props.setEditingCard(false);
    }
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
              <IconTrash
                color="gray"
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  props.setEditingCard(false);
                  card.deleteCard({ cardId, type: type });
                }}
              />
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
