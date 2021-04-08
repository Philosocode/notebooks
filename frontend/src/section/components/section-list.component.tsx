import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropResult } from "react-beautiful-dnd";
import { faLightbulb, faQuestionCircle, faStickyNote } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

// logic
import { IMenuAction, Menu } from "../../shared/components/menu/menu.component";
import { selectSectionsForPart } from "../redux/section.selectors";
import { createSection, deleteSection, updateSection, updateSectionPosition } from "../redux/section.thunks";
import { repositionSection } from "part/redux/part.slice";
import { useExpandHash } from "../../shared/hooks/use-expand-hash.hook";
import { useToggle } from "../../shared/hooks/use-toggle.hook";
import { showModal } from "modal/redux/modal.slice";

// components
import { CreateFactModal } from "../../fact/components/create-fact-modal.component";
import { DragAndDropWrapper } from "shared/components/drag-and-drop/drag-and-drop-wrapper.component";
import { DraggableWrapper } from "shared/components/drag-and-drop/draggable-wrapper.component";
import { FloatingCornerButton } from "shared/components/button/floating-corner-button.component";
import { EditableContentBox } from "shared/components/info/editable-content-box.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";

interface IProps {
  partId: string;
}
export const SectionList: React.FC<IProps> = ({ partId }) => {
  const dispatch = useDispatch();
  const sections = useSelector(selectSectionsForPart);

  const [factModalShowing, toggleFactModal] = useToggle(false);
  const { expandedHash, toggleEntityExpansion } = useExpandHash(sections ?? [], true);

  const [menuShowing, toggleMenu] = useToggle(false);
  const menuActions: IMenuAction[] = [
    { name: "Note", icon: faStickyNote, action: handleCreateSection },
    { name: "Flashcard", icon: faQuestionCircle, action: handleCreateFact },
    { name: "Concept", icon: faLightbulb, action: handleCreateConcept },
  ];

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

  function handleCreateSection() {
    dispatch(createSection({ partId }));
  }

  function handleCreateFact() {
    dispatch(showModal({
      modalType: "create-fact",
      modalProps: {
        partId
      }
    }));
  }

  function handleCreateConcept() {
    dispatch(showModal({
      modalType: "create-concept",
    }));
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
      <SHeadingSubSubtitle># Notes: {sections.length}</SHeadingSubSubtitle>

      {sections.length === 0 && <SNoItemsHeading>No sections found...</SNoItemsHeading>}
      <DragAndDropWrapper droppableId="section-list-droppable" handleDragEnd={handleDragEnd}>
        <SList>
          {sections.map((section, index) => (
            <DraggableWrapper key={section.id} draggableId={section.id} index={index} dragDisabled={false}>
              <EditableContentBox
                entityId={section.id}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                index={index}
                content={section.content}
                title={section.name}
                isExpanded={expandedHash[section.id]}
                toggleIsExpanded={toggleEntityExpansion}
              />
            </DraggableWrapper>
          ))}
        </SList>
      </DragAndDropWrapper>

      <FloatingCornerButton
        handleClick={toggleMenu}
        icon="plus"
      />
      <SMenuContainer>
        <Menu actions={menuActions} toggleMenu={toggleMenu} menuShowing={menuShowing} />
      </SMenuContainer>
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

const SMenuContainer = styled.div`
  position: fixed;
    bottom: 22rem;
    right: 16rem;

  ${theme.media.tabPort} {
    bottom: 25rem;
    right: 19rem;
    
  }
  ${theme.media.tabLand} {
    bottom: 26rem;
    right: 22rem;
  }
`;
