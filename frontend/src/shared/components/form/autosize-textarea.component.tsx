import React, {
  useState,
  useEffect,
  useRef,
  TextareaHTMLAttributes,
} from "react";
import { StyledComponent } from "styled-components";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  SWrapper: StyledComponent<"textarea", any>;
}
// FROM: https://medium.com/@lucasalgus/creating-a-custom-auto-resize-textarea-component-for-your-react-web-application-6959c0ad68bc
export const AutosizeTextarea: React.FC<IProps> = (props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState("auto");
  const [parentHeight, setParentHeight] = useState("auto");

  useEffect(() => {
    setParentHeight(`${textAreaRef.current!.scrollHeight}px`);
    setTextAreaHeight(`${textAreaRef.current!.scrollHeight}px`);
  }, [text]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaHeight("auto");
    setParentHeight(`${textAreaRef.current!.scrollHeight}px`);
    setText(event.target.value);

    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <props.SWrapper
      {...props}
      ref={textAreaRef}
      rows={1}
      style={{
        height: textAreaHeight,
      }}
      onChange={onChangeHandler}
    />
  );
};
