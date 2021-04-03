import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { faLightbulb, faRandom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import random from "lodash/random";
import styled from "styled-components";

// logic
import { createHook } from "hook/redux/hook.thunks";
import { allHooksArray } from "../data/hooks.data";

// components
import { HookSelectModal } from "./hook-select-modal.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SButtonGreen } from "shared/styles/button.style";
import { SHookContentTextarea, SHookTitleTextarea } from "../styles/hook.style";
import { MarkdownEditor } from "../../shared/mde/markdown-editor.component";

interface IProps {
  conceptId: string;
  numberOfHooks: number;
}
export const CreateHookForm: React.FC<IProps> = ({ conceptId, numberOfHooks }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hookSelectShowing, setHookSelectShowing] = useState(false);

  const dispatch = useDispatch();

  function setRandomTitle() {
    const lowerTrimmedTitle = title.trim().toLowerCase();

    while (true) {
      const randomIndex = random(0, allHooksArray.length - 1);
      const randomHook = allHooksArray[randomIndex];

      if (randomHook.toLowerCase() !== lowerTrimmedTitle) {
        return setTitle(randomHook);
      }
    }
  }

  function formDisabled() {
    return title.trim() === "" || content.trim() === "";
  }

  function showHookSelectModal() {
    setHookSelectShowing(true);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (formDisabled()) return;

    const nextPosition = numberOfHooks + 1;

    dispatch(createHook({
      conceptId,
      content,
      title,
      position: nextPosition,
    }));

    setTitle("");
    setContent("");
  }

  return (
    <>
      <SHookCreateForm onSubmit={handleSubmit}>
        <SHookTitleContainer>
          <SHookTitleTextarea
            placeholder="Enter hook title..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
          <SHookTitleIcons>
            <SHookTitleIcon icon={faLightbulb} onClick={showHookSelectModal} />
            <SHookTitleIcon icon={faRandom} onClick={setRandomTitle} />
          </SHookTitleIcons>
        </SHookTitleContainer>
        <MarkdownEditor
          value={content}
          setValue={setContent}
          placeholder="Enter hook content..."
        />
        <SCreateButton disabled={formDisabled()}>Create Hook</SCreateButton>
      </SHookCreateForm>

      <HookSelectModal
        modalShowing={hookSelectShowing}
        setModalShowing={setHookSelectShowing}
        setHook={setTitle}
      />
    </>
  );
};

const SHookCreateForm = styled.form`
  max-width: 80rem;
  
  ${theme.media.tabLand} {
    margin-top: ${theme.spacing.md};
  }
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

const SCreateButton = styled(SButtonGreen)`
  margin-top: 1.6em;
`;
