import React, { useState } from "react";

// logic
import { useForm } from "../../hooks/use-form.hook";
import { IContentBoxProps, ContentBox } from "./content-box.component";

// styles
import { SButtonGreen, SButtonRed } from "../../styles/button.style";

interface IProps extends IContentBoxProps {
  handleUpdate: (entityId: string, name: string, content: string) => void;
  handleDelete: (entityId: string) => void;
}
export const EditableContentBox: React.FC<IProps> = ({
  handleUpdate,
  handleDelete,
  ...props
}) => {
  const { handleChange, values, itemsChanged } = useForm({ title: props.title });
  const { title } = values;
  const [content, setContent] = useState(props.content);

  function buttonDisabled() {
    if (values.title.trim() === "" || content.trim() === "") return true;

    return !itemsChanged() && content.trim() === props.content;
  }

  function handleDeleteClick() {
    handleDelete(props.entityId);
  }

  function handleUpdateClick() {
    if (buttonDisabled()) return;

    handleUpdate(props.entityId, title, content);
  }

  return (
    <ContentBox
      {...props}
      title={title}
      content={content}
      handleTitleChange={handleChange}
      handleContentChange={setContent}
      buttonSlot={
        <>
          <SButtonGreen disabled={buttonDisabled()} onClick={handleUpdateClick}>Update</SButtonGreen>
          <SButtonRed onClick={handleDeleteClick}>Delete</SButtonRed>
        </>
      }
    />
  );
}