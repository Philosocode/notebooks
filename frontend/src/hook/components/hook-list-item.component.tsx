import React, { useState } from "react";
import styled from "styled-components";

// logic
import { IHook } from "hook/redux/hook.types";

// styles
import { theme } from "../../shared/styles/theme.style";
import { STextareaBase } from "../styles/hook.style";
import { SButtonGreen, SButtonRed } from "shared/styles/button.style";
import { useForm } from "../../shared/hooks/use-form.hook";

interface IProps {
  hook: IHook;
}

export const HookListItem: React.FC<IProps> = ({ hook }) => {
  const { handleChange, values } = useForm({
    title: hook.title,
    content: hook.content
  });

  const { content, title } = values;
  const [isExpanded, setIsExpanded] = useState(true);

  function changesMade() {
    const titleTrimmed = title.trim();
    const contentTrimmed = content.trim();

    return (
      titleTrimmed !== hook.title ||
      contentTrimmed !== hook.content
    );
  }

  return (
    <SContainer>
      <STitleTextarea name="title" onChange={handleChange} value={title}>
        {hook.title}
      </STitleTextarea>
      <SContentTextarea name="content" onChange={handleChange} value={content}>
        {hook.content}
      </SContentTextarea>
      <SButtons>
        <SButtonGreen disabled={!changesMade()}>Update</SButtonGreen>
        <SButtonRed>Delete</SButtonRed>
      </SButtons>
    </SContainer>
  );
};

const SContainer = styled.li`
  background: ${theme.colors.gray[100]};
  border: 1px solid ${theme.colors.gray[400]};
  border-radius: 3px;
  box-shadow: ${theme.boxShadows.light};
  margin-top: ${theme.spacing.base};
  padding: ${theme.spacing.base};
`;

const STitleTextarea = styled(STextareaBase)`
  border-top: none;
  border-left: none;
  border-right: none;
  padding-bottom: 5px;
`;

const SContentTextarea = styled(STextareaBase)`
  margin-top: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
`;

const SButtons = styled.div`
  margin-top: ${theme.spacing.sm};
  
  & > button {
    font-size: ${theme.fontSizes.sm};
  }
  
  & > button:first-child {
    margin-right: ${theme.spacing.base};
  }
`;