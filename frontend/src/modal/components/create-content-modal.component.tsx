import React, { useState } from "react";
import styled from "styled-components";

// logic
import { IModalProps } from "modal/redux/modal.types";
import { useForm } from "shared/hooks/use-form.hook";

// components
import { STextareaBase } from "shared/styles/form.style";

// styles
import { theme } from "shared/styles/theme.style";
import { SHeadingSubtitle } from "shared/styles/typography.style";
import { SButtonGreen } from "shared/styles/button.style";
import { MarkdownEditor } from "../../shared/mde/markdown-editor.component";

interface IProps extends IModalProps {
  entityName: string;
  handleCreate: (title: string, content: string) => void;
  placeholderTitle?: string;
  placeholderContent?: string;
}
export const CreateContentModal: React.FC<IProps> = ({
  entityName,
  handleCreate,
  handleClose,
  placeholderTitle,
  placeholderContent,
}) => {
  const { values, handleChange } = useForm({ title: "" });
  const { title } = values;
  const [content, setContent] = useState("");

  function submitDisabled() {
    if (title.trim() === "" || content.trim() === "") return true;
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (submitDisabled()) return;

    handleCreate(title, content);

    handleClose();
  }

  return (
    <SContent>
      <SHeadingSubtitle>Create {entityName}</SHeadingSubtitle>
      <SForm autoComplete="off" onSubmit={handleSubmit}>
        <STextarea
          name="title"
          value={title}
          placeholder={placeholderTitle}
          onChange={handleChange}
        />
        <MarkdownEditor
          initialTab="write"
          setValue={setContent}
          value={content}
          placeholder={placeholderContent}
        />
        <SButton disabled={submitDisabled()}>Create</SButton>
      </SForm>
    </SContent>
  );
};

const SContent = styled.div``;

const SForm = styled.form`
  margin-top: ${theme.spacing.base};
`;

const SButton = styled(SButtonGreen)`
  margin-top: ${theme.spacing.md};
`;

const STextarea = styled(STextareaBase)`
  font-size: ${theme.fontSizes.basePlus};
  padding: ${theme.spacing.sm};
`;