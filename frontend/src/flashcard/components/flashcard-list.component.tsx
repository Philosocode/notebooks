import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

// logic
import { IFlashcard } from "flashcard/redux/flashcard.types";
import { selectFlashcardsForSection } from "../redux/flashcard.selectors";
import { deleteFlashcard, getFlashcards, updateFlashcard, updateFlashcardPosition } from "../redux/flashcard.thunks";
import { repositionFlashcard } from "section/redux/section.slice";
import { showModal } from "../../modal/redux/modal.slice";
import { useExpandHash } from "../../shared/hooks/use-expand-hash.hook";

// components
import { CircleIcon } from "../../shared/components/button/circle-icon.component";
import { DragAndDropWrapper } from "shared/components/drag-and-drop/drag-and-drop-wrapper.component";
import { FloatingCornerButton } from "shared/components/button/floating-corner-button.component";
import { DraggableWrapper } from "../../shared/components/drag-and-drop/draggable-wrapper.component";
import { EditableContentBox } from "../../shared/components/info/editable-content-box.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";
import { SContentBoxList } from "../../shared/components/info/content-box.style";

interface IProps {
  sectionId: string;
}

export const FlashcardList: React.FC<IProps> = ({ sectionId }) => {
  const dispatch = useDispatch();
  const flashcards = useSelector(selectFlashcardsForSection);

  const { expandedHash, toggleEntityExpansion } = useExpandHash(flashcards ?? [], false);

  useEffect(() => {
    if (!flashcards) {
      dispatch(getFlashcards(sectionId))
    }
  }, [dispatch, sectionId, flashcards]);

  function handleDragEnd(result: DropResult) {
    if (!flashcards) return;

    const { source, destination } = result;
    if (!destination || destination.index === source.index) return;

    const oldIndex = source.index;
    const newIndex = destination.index;

    dispatch(repositionFlashcard({
      ownerEntityId: sectionId,
      oldIndex,
      newIndex
    }));

    // async call to update position on backend
    dispatch(updateFlashcardPosition({
      sectionId,
      flashcardId: flashcards[oldIndex].id,
      // positions in DB start at 1, not 0
      newPosition: newIndex + 1,
    }));
  }



  function handleCreate() {
    dispatch(showModal({
      modalType: "create-flashcard",
      modalProps: {
        sectionId
      }
    }));
  }

  function handleUpdate(flashcardId: string, question?: string, answer?: string) {
    const updates = { question, answer };

    dispatch(updateFlashcard({ sectionId, flashcardId, updates }));
  }

  function handleDelete(flashcardId: string) {
    dispatch(deleteFlashcard({ flashcardId, sectionId }));
  }

  function toggleFlashcardMastered(flashcard: IFlashcard) {
    const newValue = !flashcard.mastered;

    dispatch(updateFlashcard({
      sectionId,
      flashcardId: flashcard.id,
      updates: { mastered: newValue }
    }));
  }

  if (!flashcards) return null;
  return (
    <SContainer>
      <SHeadingSubSubtitle># Flashcards: {flashcards.length}</SHeadingSubSubtitle>

      {flashcards.length === 0 && <SNoItemsHeading>No flashcards found...</SNoItemsHeading>}
      <DragAndDropWrapper droppableId="flashcard-list-droppable" handleDragEnd={handleDragEnd}>
        <SContentBoxList>
          {flashcards.map((flashcard, index) => (
            <DraggableWrapper key={flashcard.id} draggableId={flashcard.id} dragDisabled={false} index={index}>
              <EditableContentBox
                entityId={flashcard.id}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                index={index}
                content={flashcard.answer}
                title={flashcard.question}
                isExpanded={expandedHash[flashcard.id]}
                toggleIsExpanded={toggleEntityExpansion}
                headerSlot={
                  <SIcon
                    icon={faCheck}
                    mastered={flashcard.mastered}
                    handleClick={() => toggleFlashcardMastered(flashcard)}
                  />
                }
              />
            </DraggableWrapper>
          ))}
        </SContentBoxList>
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

interface IMastered {
  mastered: boolean;
}
const SIcon = styled(CircleIcon)<IMastered>`
  color: ${props => props.mastered ? theme.colors.green[300] : theme.colors.gray[500]};
  font-size: 1.4rem;
  margin-left: 3px;
  margin-right: -5px;
  
  ${theme.media.tabPort} {
    font-size: 1.6rem;
  }
`;