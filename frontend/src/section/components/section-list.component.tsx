import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { faCompress, faExpand } from "@fortawesome/free-solid-svg-icons";
import { DropResult } from "react-beautiful-dnd";
import styled from "styled-components";

// logic
import { selectSectionsForPart } from "../redux/section.selectors";
import { deleteSection } from "../redux/section.thunks";
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

export const SectionList: React.FC<IProps> = ({ partId }) => {
  const dispatch = useDispatch();
  const sections = useSelector(selectSectionsForPart);

  const {
    expandedHash,
    toggleEntityExpansion,
    hasExpandedEntity,
    toggleAllExpansions
  } = useExpandHash(sections ?? []);

  function handleDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination || destination.index === source.index) return;
  }

  function handleDelete(sectionId: string) {
    dispatch(deleteSection({ sectionId, partId }));
  }

  if (!sections) return null;
  return (
    <SContainer>
      <SHeadingSubSubtitle># Sections: {sections.length}</SHeadingSubSubtitle>

      {sections.length === 0 && <SNoItemsHeading>No sections found...</SNoItemsHeading>}
      <DragAndDropWrapper droppableId="hook-list-droppable" handleDragEnd={handleDragEnd}>
        <SList>
          {sections.map((section, index) => (
            <DraggableContentBox
              key={section.id}
              dragDisabled={false}
              entityId={section.id}
              handleDelete={handleDelete}
              handleUpdate={() => {
              }}
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
        handleClick={toggleAllExpansions}
        icon={hasExpandedEntity() ? faCompress : faExpand}
      />
    </SContainer>
  );
};

const SContainer = styled.div`
  margin-top: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SNoItemsHeading = styled(SHeadingSubSubtitle)`
  font-weight: 500;
`;

const SList = styled.ul`
  margin-top: ${theme.spacing.md};
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
`;