import React, { useState } from "react";
import styled from "styled-components";
import { faLightbulb, faRandom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import { AutosizeTextarea } from "shared/components/form/autosize-textarea.component";

// styles
import { SButtonGreen } from "shared/styles/button.style";
import { theme } from "shared/styles/theme.style";

export const CreateHookForm: React.FC = () => {
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
  }
  
  return (
    <SHookCreateForm onSubmit={handleSubmit}>
      <SHookTitleContainer>
        <AutosizeTextarea
          SWrapper={SHookTitle}
          placeholder="Enter a hook title..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <SHookTitleIcons>
          <SHookTitleIcon icon={faLightbulb} />
          <SHookTitleIcon icon={faRandom} />
        </SHookTitleIcons>
      </SHookTitleContainer>
      <AutosizeTextarea
        SWrapper={SHookContent}
        placeholder="Enter hook content..."
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <SCreateButton>Create</SCreateButton>
    </SHookCreateForm>
  );
};

const SHookCreateForm = styled.form`
  margin-top: ${theme.spacing.md};
  max-width: 80rem;
`;

const SHookTitleContainer = styled.div`
  position: relative;
`;

const SHookTitleIcons = styled.div`
  font-size: 2.4rem;
`;

const SHookTitleIcon = styled(FontAwesomeIcon)`
  cursor: pointer;

  &:hover {
    color: ${theme.colors.green[400]};
  }
  &:last-child {
    margin-left: ${theme.spacing.base};
  }
`;

const STextareaBase = styled.textarea`
  resize: none;
  width: 100%;

  &:active,
  &:focus {
    outline: none;
  }
`;

const SHookTitle = styled(STextareaBase)`
  border: none;
  border-bottom: 1px solid ${theme.colors.gray[400]};
  padding: 0;
  padding-bottom: ${theme.spacing.xs};

  &:active,
  &:focus {
    border-color: ${theme.colors.green[300]};
  }
`;

const SHookContent = styled(STextareaBase)`
  margin-top: ${theme.spacing.base};
  padding: ${theme.spacing.sm};
`;

const SCreateButton = styled(SButtonGreen)`
  margin-top: ${theme.spacing.base};
`;
