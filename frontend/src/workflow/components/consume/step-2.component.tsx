import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { useForm } from "shared/hooks/use-form.hook";

import { CreateHookForm } from "hook/components/create-hook-form.component";
import { EditableContentBox } from "shared/components/info/editable-content-box.component";
import { LabelCheckbox } from "shared/components/form/label-checkbox.component";
import { MarkdownEditor } from "shared/mde/markdown-editor.component";

import { theme } from "shared/styles/theme.style";
import { SWorkflowHeading } from "../../styles/workflow.style";
import { SButton, SButtonGreen } from "shared/styles/button.style";
import { useStep } from "shared/hooks/use-step.hook";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const maxStep = 4;

export const StepTwo: React.FC<IProps> = ({ handleNext }) => {
  const topRef = useRef<HTMLDivElement>(null);

  const [studyBlocks, setStudyBlocks] = useState(0);
  const { values, setValues, handleChange } = useForm(initialCheckboxState);
  const [hooks, setHooks] = useState<IHookHash>({});
  const [previousHooks, setPreviousHooks] = useState<IHookHash>({});
  const [summaryText, setSummaryText] = useState("");
  const { step, setStep, increment } = useStep(1, maxStep);

  useEffect(() => {
    if (step >= maxStep) return;

    const numChecks = Object.values(values).filter(val => val === true).length;

    // read/watch done
    if (
      (step === 1 && numChecks === 1) ||
      (step === 2 && numChecks === 3) ||
      (step === 3 && summaryText.trim().length >= 5)
    ) {
      increment();
    }
  }, [values, step, increment, summaryText]);

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

    // go back to step 1
    setStep(1);

    // increment # study blocks
    setStudyBlocks(prevValue => prevValue + 1);

    // scroll to top
    topRef.current?.scrollIntoView();
  }

  const nextBlockDisabled = step !== maxStep;

  return (
    <SContainer ref={topRef}>
      <SStudyBlockCounter>
        <SIcon icon={faStar} /> <SCount>{studyBlocks}</SCount>
      </SStudyBlockCounter>
      <SWorkflowHeading>Read / Watch</SWorkflowHeading>
      <LabelCheckbox
        htmlFor="readWatch"
        text="Study for a few minutes. Read a few paragraphs or pages"
        id="readWatch"
        name="readWatch"
        onChange={handleChange}
        checked={values.readWatch}
      />

      {step >= 2 && (
        <>
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
            text="Summarize what you learned this study block"
            id="summarize"
            name="summarize"
            onChange={handleChange}
            checked={values.summarize}
          />
        </>
      )}

      {step >= 3 && (
        <>
          <MarkdownEditor
            value={summaryText}
            setValue={setSummaryText}
            placeholder="Enter summary of what you've learned..."
            initialTab="write"
            imagesAreTemporary
          />
        </>
      )}

      {step >= 4 && (
        <>
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
              Next Study Block
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
        </>
      )}
    </SContainer>
  );
};

const SContainer = styled.div`
  position: relative;
`;

const SIcon = styled(FontAwesomeIcon)`
  margin-left: 1rem;
`;

const SCount = styled.span`
  display: inline-block;
  margin-left: 0.75rem;
  margin-right: 1rem;
  font-weight: bold;
  position: relative;
  top: 1px;
`;

const SStudyBlockCounter = styled.div`
  background: ${theme.colors.green[300]};
  border-radius: 1rem;
  color: white;
  display: flex;
    align-items: center;
    justify-content: space-between;
  
  position: absolute;
  height: 4rem;
    top: -2rem;
    right: 0;

  ${theme.media.tabPort} {
    height: 5rem;
    top: -5rem;
  }
`;

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