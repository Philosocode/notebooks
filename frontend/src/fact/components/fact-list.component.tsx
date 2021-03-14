import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropResult } from "react-beautiful-dnd";
import styled from "styled-components";

// logic
import { selectFactsForPart } from "../redux/fact.selectors";
import { createFact, deleteFact, getFacts, updateFact, updateFactPosition } from "../redux/fact.thunks";
import { repositionFact } from "part/redux/part.slice";
import { useExpandHash } from "../../shared/hooks/use-expand-hash.hook";

// components
import { DragAndDropWrapper } from "shared/components/drag-and-drop/drag-and-drop-wrapper.component";
import { DraggableContentBox } from "../../shared/components/info/draggable-content-box.component";
import { FloatingCornerButton } from "shared/components/button/floating-corner-button.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";

interface IProps {
  partId: string;
}

export const FactList: React.FC<IProps> = ({ partId }) => {
  const dispatch = useDispatch();
  const facts = useSelector(selectFactsForPart);

  const { expandedHash, toggleEntityExpansion } = useExpandHash(facts ?? [], true);

  useEffect(() => {
    if (!facts) {
      dispatch(getFacts(partId))
    }
  }, [dispatch, partId, facts]);

  function handleDragEnd(result: DropResult) {
    if (!facts) return;

    const { source, destination } = result;
    if (!destination || destination.index === source.index) return;

    const oldIndex = source.index;
    const newIndex = destination.index;

    dispatch(repositionFact({
      ownerEntityId: partId,
      oldIndex,
      newIndex
    }));

    // async call to update position on backend
    dispatch(updateFactPosition({
      partId,
      factId: facts[oldIndex].id,
      // positions in DB start at 1, not 0
      newPosition: newIndex + 1,
    }));
  }

  function handleCreate() {
    dispatch(createFact({ partId, initialValues: { question: "Question", answer: "Answer" } }));
  }

  function handleUpdate(factId: string, question?: string, answer?: string) {
    const updates = { question, answer };

    dispatch(updateFact({ partId, factId, updates }));
  }

  function handleDelete(factId: string) {
    dispatch(deleteFact({ factId, partId }));
  }

  if (!facts) return null;
  return (
    <SContainer>
      <SHeadingSubSubtitle># Facts: {facts.length}</SHeadingSubSubtitle>

      {facts.length === 0 && <SNoItemsHeading>No facts found...</SNoItemsHeading>}
      <DragAndDropWrapper droppableId="section-list-droppable" handleDragEnd={handleDragEnd}>
        <SList>
          {facts.map((fact, index) => (
            <DraggableContentBox
              key={fact.id}
              dragDisabled={false}
              entityId={fact.id}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              index={index}
              initialContent={fact.answer}
              initialName={fact.question}
              isExpanded={expandedHash[fact.id]}
              toggleIsExpanded={toggleEntityExpansion}
            />
          ))}
        </SList>
      </DragAndDropWrapper>

      <FloatingCornerButton
        handleClick={handleCreate}
        icon="plus"
      />
    </SContainer>
  );
};

const SContainer = styled.div`
  margin-top: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SNoItemsHeading = styled(SHeadingSubSubtitle)`
  font-weight: 500;
`;

const SList = styled.ul`
  margin-top: ${theme.spacing.base};
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
`;