import React, { useState } from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

import { theme } from "../styles/theme.style";
import styles from "./markdown-editor.module.css";

interface IProps {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
}
export const MarkdownEditor: React.FC<IProps> = ({
  value,
  setValue,
  placeholder,
}) => {
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  return (
    <SContainer>
      <ReactMde
        classes={{
          reactMde: styles.container,
          textArea: styles.textarea,
          toolbar: styles.toolbar,
          preview: styles.preview,
        }}
        childProps={{
          textArea: {
            placeholder,
          }
        }}
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown => Promise.resolve(<ReactMarkdown source={markdown} />)}
      />
    </SContainer>
  );
}

const SContainer = styled.div`
  margin-top: ${theme.spacing.base};
`;