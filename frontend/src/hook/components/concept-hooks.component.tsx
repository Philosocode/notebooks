import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// logic
import { IConcept } from "concept/redux/concept.types";
import { getHooks } from "hook/redux/hook.thunks";

// components
import { CreateHookForm } from "./create-hook-form.component";
import { HookList } from "./hook-list.component";

// styles
import { theme } from "shared/styles/theme.style";
import { selectCurrentConceptHooks } from "../../concept/redux/concept.selectors";

interface IProps {
  concept: IConcept;
}
export const ConceptHooks: React.FC<IProps> = ({ concept }) => {
  const dispatch = useDispatch();
  const hooks = useSelector(selectCurrentConceptHooks);

  useEffect(() => {
    if (!concept.hooks) {
      dispatch(getHooks(concept.id));
    }
  }, [concept, dispatch]);

  console.log("HOOKS", hooks);

  if (!concept.hooks) return <div>Concept Hooks Loading...</div>;
  return (
    <>
      <CreateHookForm currentConcept={concept} />
      <SDivider />
      <HookList hooks={hooks} conceptId={concept.id} />
    </>
  );
};

const SDivider = styled.div`
  background: ${theme.colors.black};
  height: 1px;
  width: 100%;
  margin: ${theme.spacing.md} auto;
`;