import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

// logic
import { IConcept } from "concept/redux/concept.types";
import { getHooks } from "hook/redux/hook.thunks";

// components
import { CreateHookForm } from "./create-hook-form.component";
import { HookList } from "./hook-list.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";

interface IProps {
  currentConcept: IConcept;
}
export const ConceptHooks: React.FC<IProps> = ({ currentConcept }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentConcept.hooks) {
      dispatch(getHooks(currentConcept.id));
    }
  }, [currentConcept, dispatch]);

  if (!currentConcept?.hooks) return null;
  return (
    <>
      <CreateHookForm currentConcept={currentConcept} />
      <SDivider />
      <HookList hooks={currentConcept.hooks} />
    </>
  );
};

const SDivider = styled.div`
  background: ${theme.colors.black};
  height: 1px;
  width: 100%;
  margin: ${theme.spacing.md} auto;
`;