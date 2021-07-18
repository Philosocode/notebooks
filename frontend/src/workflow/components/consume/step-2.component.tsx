import React, { useRef, useState } from "react";
import styled from "styled-components";

import { useForm } from "shared/hooks/use-form.hook";

import { CreateHookForm } from "hook/components/create-hook-form.component";
import { EditableContentBox } from "shared/components/info/editable-content-box.component";
import { LabelCheckbox } from "shared/components/form/label-checkbox.component";
import { MarkdownEditor } from "shared/mde/markdown-editor.component";

import { theme } from "shared/styles/theme.style";
import { SWorkflowHeading } from "../../styles/workflow.style";
import { SButton, SButtonGreen } from "shared/styles/button.style";

interface IHook {
  id: string;
  name: string;
  content: string;
}

interface IHookHash {
  [key: string]: IHook;
}
interface IProps {
  handleNext: () => void;
}

const initialCheckboxState = {
  readWatch: false,
  stopAndThink: false,
  summarize: false,
  hooks: false,
};

export const StepTwo: React.FC<IProps> = ({ handleNext }) => {
  const topRef = useRef<HTMLDivElement>(null);

  const { values, setValues, handleChange } = useForm(initialCheckboxState);
  const [hooks, setHooks] = useState<IHookHash>({});
  const [previousHooks, setPreviousHooks] = useState<IHookHash>({});
  const [summaryText, setSummaryText] = useState("");

  function getRandomId() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  function handleCreate(name: string, content: string) {
    let uniqueId = getRandomId();
    while (uniqueId in hooks || uniqueId in previousHooks)
      uniqueId = getRandomId();

    const newHook = { id: uniqueId, name, content };

    setHooks((prevHash) => {
      return {
        ...prevHash,
        [uniqueId]: newHook,
      };
    });
  }

  function handleUpdate(entityId: string, name: string, content: string) {
    setHooks((prevHash) => {
      const hooksClone = { ...prevHash };

      hooksClone[entityId] = {
        ...hooksClone[entityId],
        name,
        content,
      };

      return hooksClone;
    });
  }

  function handlePreviousUpdate(
    entityId: string,
    name: string,
    content: string
  ) {
    setPreviousHooks((prevHash) => {
      const hooksClone = { ...prevHash };

      hooksClone[entityId] = {
        ...hooksClone[entityId],
        name,
        content,
      };

      return hooksClone;
    });
  }

  function handleDelete(entityId: string) {
    setHooks((prevHash) => {
      const hooksClone = { ...prevHash };

      delete hooksClone[entityId];

      return hooksClone;
    });
  }

  function handlePreviousDelete(entityId: string) {
    setPreviousHooks((prevHash) => {
      const hooksClone = { ...prevHash };

      delete hooksClone[entityId];

      return hooksClone;
    });
  }

  function handleReset() {
    // transfer current hooks to previousHooks
    setPreviousHooks((prevState) => ({ ...prevState, ...hooks }));

    // clear current hooks
    setHooks({});

    // clear checkboxes
    setValues(initialCheckboxState);

    // clear summary
    setSummaryText("");

    // scroll to top
    topRef.current?.scrollIntoView();
  }

  const nextBlockDisabled =
    Object.values(values).includes(false) || summaryText.trim() === "";

  return (
    <div ref={topRef}>
      <SWorkflowHeading>Read / Watch</SWorkflowHeading>
      <LabelCheckbox
        htmlFor="readWatch"
        text="Study for a few minutes (read a few paragraphs or pages)"
        id="readWatch"
        name="readWatch"
        onChange={handleChange}
        checked={values.readWatch}
      />

      <SWorkflowHeading>Summarize</SWorkflowHeading>
      <LabelCheckbox
        htmlFor="stopAndThink"
        text="Stop and think about what you just learned"
        id="stopAndThink"
        name="stopAndThink"
        onChange={handleChange}
        checked={values.stopAndThink}
      />
      <LabelCheckbox
        htmlFor="summarize"
        text="Summarize what you learned this block"
        id="summarize"
        name="summarize"
        onChange={handleChange}
        checked={values.summarize}
      />
      <MarkdownEditor
        value={summaryText}
        setValue={setSummaryText}
        placeholder="Enter summary of what you've learned..."
        initialTab="write"
        imagesAreTemporary
      />

      <SWorkflowHeading>Hooks</SWorkflowHeading>
      <LabelCheckbox
        htmlFor="hooks"
        text="Create hooks for difficult concepts"
        id="hooks"
        name="hooks"
        onChange={handleChange}
        checked={values.hooks}
      />
      <SCreateHookForm handleCreate={handleCreate} />
      <SButtons>
        <SButtonGreen onClick={handleReset} disabled={nextBlockDisabled}>
          Next Block
        </SButtonGreen>
        <SButton onClick={handleNext}>Finish Material</SButton>
      </SButtons>

      <SWorkflowHeading style={{ textAlign: "center" }}>
        Current Hooks
      </SWorkflowHeading>
      <SHookList>
        {Object.values(hooks).map((hook, index) => (
          <EditableContentBox
            key={hook.id}
            title={hook.name}
            content={hook.content}
            entityId={hook.id}
            index={index}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            isExpanded={true}
            toggleIsExpanded={() => {}}
            imagesAreTemporary
          />
        ))}
      </SHookList>
      <hr />
      <SWorkflowHeading style={{ textAlign: "center" }}>
        Previous Hooks
      </SWorkflowHeading>
      <SHookList>
        {Object.values(previousHooks).map((hook, index) => (
          <EditableContentBox
            key={hook.id}
            title={hook.name}
            content={hook.content}
            entityId={hook.id}
            index={index}
            handleUpdate={handlePreviousUpdate}
            handleDelete={handlePreviousDelete}
            isExpanded={true}
            toggleIsExpanded={() => {}}
            imagesAreTemporary
          />
        ))}
      </SHookList>
    </div>
  );
};

const SCreateHookForm = styled(CreateHookForm)`
  margin-top: ${theme.spacing.base};
`;

const SButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${theme.spacing.base};
`;

const SHookList = styled.div`
  margin-top: ${theme.spacing.base};
  margin-bottom: ${theme.spacing.md};

  &:first-of-type {
    margin-top: ${theme.spacing.md};
  }
`;
