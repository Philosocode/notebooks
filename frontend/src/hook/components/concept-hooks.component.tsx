import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

// logic
import { IConcept } from "../../concept/redux/concept.types";
import { getHooks } from "hook/redux/hook.thunks";

// components
import { CreateHookForm } from "./create-hook-form.component";
import { HookList } from "./hook-list.component";

// styles
import { theme } from "shared/styles/theme.style";

interface IProps {
  concept: IConcept;
}
export const ConceptHooks: React.FC<IProps> = ({ concept }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!concept.hooks) {
      dispatch(getHooks(concept.id));
    }
  }, [concept, dispatch]);

  if (!concept.hooks) return null;
  return (
    <>
      <CreateHookForm
        conceptId={concept.id}
        numberOfHooks={concept.hooks.length}
      />
      <SDivider />
      <HookList conceptId={concept.id} hooks={concept.hooks} />
    </>
  );
};

const SDivider = styled.div`
  background: ${theme.colors.black};
  height: 1px;
  width: 100%;
  margin: ${theme.spacing.md} auto;
`;