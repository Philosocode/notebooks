import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropResult } from "react-beautiful-dnd";
import styled from "styled-components";

// logic
import { createSection, getSections, updateSectionPosition } from "section/redux/section.thunks";
import { selectCurrentNotebook, selectNotebookSections } from "notebook/redux/notebook.selectors";
import { repositionSection } from "notebook/redux/notebook.slice";

// components
import { DragAndDropWrapper } from "shared/components/drag-and-drop/drag-and-drop-wrapper.component";
import { SectionListItem } from "./section-list-item.component";
import { FloatingCornerButton } from "shared/components/button/floating-corner-button.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";
import { useToggle } from "../../shared/hooks/use-toggle.hook";
import { CreateNamedEntityModal } from "../../shared/components/modal/create-named-entity-modal.component";

interface IProps {
  notebookId: string;
}
export const SectionList: React.FC<IProps> = ({ notebookId }) => {
  const dispatch = useDispatch();
  const currentNotebook = useSelector(selectCurrentNotebook);
  const notebookSections = useSelector(selectNotebookSections);

  // modal states
  const [createModalShowing, toggleCreateModalShowing] = useToggle(false);

  useEffect(() => {
    if (currentNotebook && !currentNotebook.sectionIds) {
      dispatch(getSections(notebookId));
    }
  }, [currentNotebook, dispatch, notebookId]);

  function handleCreate(name: string) {
    dispatch(createSection({ name, notebookId }));
  }

  function handleDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination || destination.index === source.index) return;

    const oldIndex = source.index;
    const newIndex = destination.index;

    dispatch(repositionSection({
      ownerEntityId: notebookId,
      oldIndex,
      newIndex
    }));

    if (!notebookSections) return;

    // async call to update position on backend
    dispatch(updateSectionPosition({
      notebookId,
      sectionId: notebookSections[oldIndex].id,
      // positions in DB start at 1, not 0
      newPosition: newIndex + 1,
    }));
  }

  if (notebookSections === undefined) return null;
  return (
    <DragAndDropWrapper droppableId="section-list-droppable" handleDragEnd={handleDragEnd}>
      <SList>
        {notebookSections.length === 0 && (
          <SHeadingSubSubtitle weight={500}>No sections found...</SHeadingSubSubtitle>
        )}
        {notebookSections.map((section, index) => (
          <SectionListItem
            section={section}
            key={section.id}
            index={index}
            notebookId={notebookId}
          />
        ))}
      </SList>
      <FloatingCornerButton icon="plus" handleClick={toggleCreateModalShowing} />
      <CreateNamedEntityModal
        createEntity={handleCreate}
        entityName="Section"
        handleClose={toggleCreateModalShowing}
        isShowing={createModalShowing}
      />
    </DragAndDropWrapper>
  );
};

const SList = styled.ul`
  margin-top: ${theme.spacing.base};
`;