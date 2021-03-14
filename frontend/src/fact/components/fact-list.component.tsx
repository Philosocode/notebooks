import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropResult } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { IFact } from "fact/redux/fact.types";

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

  function toggleFactMastered(event: React.MouseEvent, fact: IFact) {
    event.stopPropagation();

    const newValue = !fact.mastered;

    dispatch(updateFact({
      partId,
      factId: fact.id,
      updates: { mastered: newValue }
    }));
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
              headerSlot={
                <SStarContainer
                  mastered={fact.mastered}
                  onClick={(event) => toggleFactMastered(event, fact)}
                >
                  <SIcon icon={faStar} />
                </SStarContainer>
              }
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

const SIcon = styled(FontAwesomeIcon)``;

interface SStarContainerProps {
  mastered: boolean;
}
const SStarContainer = styled.div<SStarContainerProps>`
  color: ${props => props.mastered ? theme.colors.green[300] : theme.colors.gray[500]};
  display: flex;
    align-items: center;
    justify-content: center;
  margin-left: ${theme.spacing.xs};
  position: relative;

  &:hover {
    background: ${theme.colors.gray[100]};
    
    ${SIcon} {
      color: ${theme.colors.green[300]};
    }
  }

  border-radius: 50%;
  height: 3rem;
  width: 3rem;
`;