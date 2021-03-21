import React from "react";

// logic
import { useForm } from "../../hooks/use-form.hook";
import { IContentBoxProps, ContentBox } from "./content-box.component";

// components

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
  const { handleChange, values, itemsChanged } = useForm({ title: props.title, content: props.content });
  const { content, title } = values;

  function buttonDisabled() {
    if (values.title.trim() === "" || values.content.trim() === "") return true;

    return !itemsChanged();
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
      handleChange={handleChange}
      buttonSlot={
        <>
          <SButtonGreen disabled={buttonDisabled()} onClick={handleUpdateClick}>Update</SButtonGreen>
          <SButtonRed onClick={handleDeleteClick}>Delete</SButtonRed>
        </>
      }
    />
  );
}