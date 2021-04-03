import React, { useState } from "react";
import ReactMde, { SaveImageHandler } from "react-mde";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

import { theme } from "../styles/theme.style";
import styles from "./markdown-editor.module.css";

export type TMarkdownEditorTab = "write" | "preview";

interface IProps {
  value: string;
  initialTab?: TMarkdownEditorTab;
  setValue?: (value: string) => void;
  placeholder?: string;
}
export const MarkdownEditor: React.FC<IProps> = ({
  initialTab,
  value,
  setValue,
  placeholder,
}) => {
  const [selectedTab, setSelectedTab] = useState<TMarkdownEditorTab>(initialTab ?? "preview");

  const save: SaveImageHandler = async function*(data: ArrayBuffer) {
    // Promise that waits for "time" milliseconds
    // const wait = function(time: number) {
    //   return new Promise((a, r) => {
    //     setTimeout(() => a(), time);
    //   });
    // };

    // Upload "data" to your server
    // Use XMLHttpRequest.send to send a FormData object containing
    // "data"
    // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest

    // await wait(2000);
    // yields the URL that should be inserted in the markdown
    yield "https://picsum.photos/300";
    // await wait(2000);

    // returns true meaning that the save was successful
    return true;
  };

  return (
    <SContainer>
      <ReactMde
        classes={{
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
        onChange={setValue ? setValue : () => {}}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown => Promise.resolve(<ReactMarkdown source={markdown} />)}
        paste={{
          saveImage: save
        }}
      />
    </SContainer>
  );
}

const SContainer = styled.div`
  margin-top: ${theme.spacing.base};
`;