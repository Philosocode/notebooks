import React, { useState } from "react";
import { faLightbulb, faRandom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import random from "lodash/random";
import styled from "styled-components";

// logic
import { allHooksArray } from "../data/hooks.data";

// components
import { HookSelectModal } from "./hook-select-modal.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SButtonGreen } from "shared/styles/button.style";
import { SHookNameTextarea } from "../styles/hook.style";
import { MarkdownEditor } from "../../shared/mde/markdown-editor.component";

interface IProps {
  handleCreate: (name: string, content: string) => void;
}
export const CreateHookForm: React.FC<IProps> = ({ handleCreate }) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [hookSelectShowing, setHookSelectShowing] = useState(false);

  function setRandomName() {
    const lowerTrimmedName = name.trim().toLowerCase();

    while (true) {
      const randomIndex = random(0, allHooksArray.length - 1);
      const randomHook = allHooksArray[randomIndex];

      if (randomHook.toLowerCase() !== lowerTrimmedName) {
        return setName(randomHook);
      }
    }
  }

  function formDisabled() {
    return name.trim() === "" || content.trim() === "";
  }

  function showHookSelectModal() {
    setHookSelectShowing(true);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (formDisabled()) return;

    handleCreate(name, content);

    setName("");
    setContent("");
  }

  return (
    <>
      <SHookCreateForm onSubmit={handleSubmit}>
        <SHookNameContainer>
          <SHookNameTextarea
            placeholder="Enter hook name..."
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <SHookNameIcons>
            <SHookNameIcon icon={faLightbulb} onClick={showHookSelectModal} />
            <SHookNameIcon icon={faRandom} onClick={setRandomName} />
          </SHookNameIcons>
        </SHookNameContainer>
        <MarkdownEditor
          value={content}
          setValue={setContent}
          placeholder="Enter hook content..."
          initialTab="write"
        />
        <SCreateButton disabled={formDisabled()}>Create Hook</SCreateButton>
      </SHookCreateForm>

      <HookSelectModal
        modalShowing={hookSelectShowing}
        setModalShowing={setHookSelectShowing}
        setHook={setName}
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

const SHookNameContainer = styled.div`
  position: relative;
`;

const SHookNameIcons = styled.div`
  font-size: 2.4rem;
`;

const SHookNameIcon = styled(FontAwesomeIcon)`
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
