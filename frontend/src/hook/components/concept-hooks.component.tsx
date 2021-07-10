import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// logic
import { IConcept } from "../../concept/redux/concept.types";
import { createHook, getHooks } from "hook/redux/hook.thunks";
import { selectConceptHooks } from "concept/redux/concept.selectors";

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
  const conceptHooks = useSelector(selectConceptHooks);

  useEffect(() => {
    if (concept.hookIds === undefined) {
      dispatch(getHooks(concept.id));
    }
  }, [concept, dispatch]);

  function handleCreate(name: string, content: string) {
    if (!conceptHooks) return;

    const nextPosition = conceptHooks.length + 1;

    dispatch(createHook({
      conceptId: concept.id,
      content,
      name,
      position: nextPosition,
    }));
  }

  if (!conceptHooks) return null;
  return (
    <>
      <SCreateHookForm handleCreate={handleCreate} />
      <SDivider />
      <HookList conceptId={concept.id} hooks={conceptHooks} />
    </>
  );
};

const SCreateHookForm = styled(CreateHookForm)`
  ${theme.media.tabLand} {
    margin-top: ${theme.spacing.md};
  }
`;

const SDivider = styled.div`
  background: ${theme.colors.black};
  height: 1px;
  margin: ${theme.spacing.base} auto;
  width: 100%;

  ${theme.media.tabLand} {
    margin: ${theme.spacing.md} auto;
  }
`;