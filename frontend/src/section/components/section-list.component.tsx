import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropResult } from "react-beautiful-dnd";
import styled from "styled-components";

// logic
import { selectSectionsForPart } from "../redux/section.selectors";
import { createSection, deleteSection, updateSection, updateSectionPosition } from "../redux/section.thunks";
import { repositionSection } from "part/redux/part.slice";
import { useExpandHash } from "../../shared/hooks/use-expand-hash.hook";

// components
import { DragAndDropWrapper } from "shared/components/drag-and-drop/drag-and-drop-wrapper.component";
import { DraggableContentBox } from "../../shared/components/info/draggable-content-box.component";
import { FloatingCornerButton } from "shared/components/button/floating-corner-button.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";
import { repositionPart } from "../../material/redux/material.slice";
import { updatePartPosition } from "../../part/redux/part.thunks";

interface IProps {
  partId: string;
}

export const SectionList: React.FC<IProps> = ({ partId }) => {
  const dispatch = useDispatch();
  const sections = useSelector(selectSectionsForPart);

  const {
    expandedHash,
    toggleEntityExpansion,
    toggleAllExpansions
  } = useExpandHash(sections ?? [], true);

  function handleDragEnd(result: DropResult) {
    if (!sections) return;

    const { source, destination } = result;
    if (!destination || destination.index === source.index) return;

    const oldIndex = source.index;
    const newIndex = destination.index;

    dispatch(repositionSection({
      ownerEntityId: partId,
      oldIndex,
      newIndex
    }));

    // async call to update position on backend
    dispatch(updateSectionPosition({
      partId,
      sectionId: sections[oldIndex].id,
      // positions in DB start at 1, not 0
      newPosition: newIndex + 1,
    }));
  }

  function handleCreate() {
    dispatch(createSection(partId));
  }

  function handleUpdate(sectionId: string, name?: string, content?: string) {
    const updates = { name, content };
    dispatch(updateSection({
      partId,
      sectionId,
      updates,
    }));
  }

  function handleDelete(sectionId: string) {
    dispatch(deleteSection({ sectionId, partId }));
  }

  if (!sections) return null;
  return (
    <SContainer>
      <SHeadingSubSubtitle># Sections: {sections.length}</SHeadingSubSubtitle>

      {sections.length === 0 && <SNoItemsHeading>No sections found...</SNoItemsHeading>}
      <DragAndDropWrapper droppableId="section-list-droppable" handleDragEnd={handleDragEnd}>
        <SList>
          {sections.map((section, index) => (
            <DraggableContentBox
              key={section.id}
              dragDisabled={false}
              entityId={section.id}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              index={index}
              initialContent={section.content}
              initialName={section.name}
              isExpanded={expandedHash[section.id]}
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