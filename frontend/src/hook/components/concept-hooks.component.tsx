import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// logic

// components

// styles
import { CreateHookForm } from "./create-hook-form.component";
import { getHooks } from "hook/redux/hook.thunks";
import { IConcept } from "concept/redux/concept.types";
import styled from "styled-components";
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
      <SHeadingSubSubtitle>
        # Hooks: {currentConcept.hooks.length}
      </SHeadingSubSubtitle>
      {
        currentConcept.hooks.map(hook => (
          <div>
            <h1>{hook.title}</h1>
            <p>{hook.content}</p>
            <p>{hook.position}</p>
          </div>
        ))
      }
    </>
  );
};

const SDivider = styled.div`
  background: ${theme.colors.black};
  height: 1px;
  width: 100%;
  margin: ${theme.spacing.md} auto;
`;