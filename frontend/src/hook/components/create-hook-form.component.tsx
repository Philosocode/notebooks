import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { faLightbulb, faRandom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import random from "lodash/random";
import styled from "styled-components";
import AutosizeTextarea from "react-textarea-autosize";

// logic
import { createHook } from "hook/redux/hook.thunks";
import { allHooksArray } from "../data/hooks.data";
import { selectCurrentConcept } from "concept/redux/concept.selectors";

// components
import { HookSelectModal } from "./hook-select-modal.component";

// styles
import { SButtonGreen } from "shared/styles/button.style";
import { theme } from "shared/styles/theme.style";

export const CreateHookForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hookSelectShowing, setHookSeletingShowing] = useState(false);

  const currentConcept = useSelector(selectCurrentConcept);
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
    setHookSeletingShowing(true);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (formDisabled()) return;
    if (!currentConcept?.hooks) return;

    const nextPosition = currentConcept.hooks.length + 1;

    dispatch(createHook({
      conceptId: currentConcept.id,
      content,
      title,
      position: nextPosition,
    }));

    setTitle("");
    setContent("");
  }

  if (!currentConcept) return <Redirect to="/concepts" />;
  return (
    <>
      <SHookCreateForm onSubmit={handleSubmit}>
        <SHookTitleContainer>
          <SHookTitleTextarea
            placeholder="Enter a hook title..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
          <SHookTitleIcons>
            <SHookTitleIcon icon={faLightbulb} onClick={showHookSelectModal} />
            <SHookTitleIcon icon={faRandom} onClick={setRandomTitle} />
          </SHookTitleIcons>
        </SHookTitleContainer>
        <SHookContentTextarea
          placeholder="Enter hook content..."
          onChange={(e) => setContent(e.target.value)}
          value={content}
          minRows={10}
          required
        />
        <SCreateButton disabled={formDisabled()}>Create Hook</SCreateButton>
      </SHookCreateForm>

      <HookSelectModal
        modalShowing={hookSelectShowing}
        setModalShowing={setHookSeletingShowing}
        setHook={setTitle}
      />
    </>
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

const STextareaBase = styled(AutosizeTextarea)`
  resize: none;
  width: 100%;

  &:active,
  &:focus {
    outline: none;
  }
`;

const SHookTitleTextarea = styled(STextareaBase)`
  border: none;
  border-bottom: 1px solid;
  padding: 0;
  padding-bottom: ${theme.spacing.xs};
`;

const SHookContentTextarea = styled(STextareaBase)`
  margin-top: ${theme.spacing.base};
  padding: ${theme.spacing.sm};
`;

const SCreateButton = styled(SButtonGreen)`
  margin-top: ${theme.spacing.base};
`;
