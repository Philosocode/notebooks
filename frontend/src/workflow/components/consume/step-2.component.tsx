import React, { useState } from "react";
import styled from "styled-components";

import { CreateHookForm } from "hook/components/create-hook-form.component";
import { EditableContentBox } from "shared/components/info/editable-content-box.component";

import { SButton, SWorkflowHeading } from "../../styles/workflow.style";
import { theme } from "shared/styles/theme.style";

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

export const StepTwo: React.FC<IProps> = ({ handleNext }) => {
  const [hooks, setHooks] = useState<IHookHash>({});

  function getRandomId() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  function handleCreate(name: string, content: string) {
    let uniqueId = getRandomId();
    while (uniqueId in hooks) uniqueId = getRandomId();

    const newHook = { id: uniqueId, name, content };

    setHooks((prevHash) => {
      return {
        ...prevHash,
        [uniqueId]: newHook,
      };
    });
  }

  function handleUpdate(entityId: string, name: string, content: string) {
    setHooks(prevHash => {
      const hooksClone = {...prevHash};

      hooksClone[entityId] = {
        ...hooksClone[entityId],
        name,
        content,
      };

      return hooksClone;
    });
  }

  function handleDelete(entityId: string) {
    setHooks(prevHash => {
      const hooksClone = {...prevHash};

      delete hooksClone[entityId];

      return hooksClone;
    });
  }

  return (
    <div>
      <SWorkflowHeading>Hooks</SWorkflowHeading>
      <SCreateHookForm handleCreate={handleCreate} />
      <SButton onClick={handleNext}>Next</SButton>

      <SHooks>
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
      </SHooks>
    </div>
  );
};

const SCreateHookForm = styled(CreateHookForm)`
  margin-top: ${theme.spacing.base};
`;

const SHooks = styled.div`
  margin-top: ${theme.spacing.md};
`;