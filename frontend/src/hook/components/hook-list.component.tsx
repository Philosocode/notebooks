import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { faCompress, faExpand } from "@fortawesome/free-solid-svg-icons";
import { DropResult } from "react-beautiful-dnd";

// logic
import { IHook } from "../redux/hook.types";
import { repositionHook } from "concept/redux/concept.slice";
import { deleteHook, updateHook, updateHookPosition } from "../redux/hook.thunks";
import { useExpandHash } from "shared/hooks/use-expand-hash.hook";
import { useEntityFilterSort } from "shared/hooks/use-entity-filter-sort.hook";

// components
import { FloatingCornerButton } from "../../shared/components/button/floating-corner-button.component";
import { DragAndDropWrapper } from "shared/components/drag-and-drop/drag-and-drop-wrapper.component";
import { SortFilterControls } from "../../shared/components/button/sort-filter-controls.component";
import { EditableContentBox } from "../../shared/components/info/editable-content-box.component";
import { DraggableWrapper } from "../../shared/components/drag-and-drop/draggable-wrapper.component";

// styles
import { theme } from "../../shared/styles/theme.style";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";
import { SContentBoxList } from "../../shared/components/info/content-box.style";

interface IProps {
  conceptId: string;
  hooks: IHook[];
}
export const HookList: React.FC<IProps> = ({ conceptId, hooks }) => {
  const dispatch = useDispatch();

  const {
    filteredEntities: filteredHooks,
    filterText,
    handleFilterTextChange,
    sortMode,
    getSortIconCaret,
    handleSortClick,
  } = useEntityFilterSort<IHook>(hooks, "name");

  const {
    expandedHash,
    toggleEntityExpansion,
    hasExpandedEntity,
    toggleAllExpansions
  } = useExpandHash(hooks);

  function handleDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination || destination.index === source.index) return;

    const oldIndex = source.index;
    const newIndex = destination.index;

    dispatch(repositionHook({
      ownerEntityId: conceptId,
      oldIndex,
      newIndex
    }));

    // async call to update position on backend
    dispatch(updateHookPosition({
      conceptId,
      hookId: hooks[oldIndex].id,
      // positions in DB start at 1, not 0
      newPosition: newIndex + 1,
    }));
  }

  function handleUpdate(hookId: string, name?: string, content?: string) {
    const updates = { name, content };
    dispatch(updateHook({
      hookId,
      conceptId,
      updates,
    }));
  }

  function handleDelete(hookId: string) {
    dispatch(deleteHook({ hookId, conceptId }));
  }

  const hasExpandedHook = hasExpandedEntity();

  // disable drag-and-drop if sort mode
  const dragEnabled = sortMode === "custom" && filterText.trim() === "";
  const hooksToShow = dragEnabled
    ? hooks
    : filteredHooks;

  return (
    <SContainer>
      <SHeadingSubSubtitle># Hooks: {hooks.length}</SHeadingSubSubtitle>

      <SortFilterControls
        filterText={filterText}
        getIcon={getSortIconCaret}
        handleFilterTextChange={handleFilterTextChange}
        handleSortClick={handleSortClick}
        sortMode={sortMode}
        isCentered
        includeCustom
      />

      {filteredHooks.length === 0 && <SNotFoundHeading>No hooks found...</SNotFoundHeading>}
      <DragAndDropWrapper droppableId="hook-list-droppable" handleDragEnd={handleDragEnd}>
        <SList>
          {hooksToShow.map((hook, index) => (
            <DraggableWrapper key={hook.id} draggableId={hook.id} index={index} dragDisabled={!dragEnabled}>
              <EditableContentBox
                entityId={hook.id}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                index={index}
                title={hook.name}
                content={hook.content}
                isExpanded={expandedHash[hook.id]}
                toggleIsExpanded={toggleEntityExpansion}
              />
            </DraggableWrapper>
          ))}
        </SList>
      </DragAndDropWrapper>

      <FloatingCornerButton
        handleClick={toggleAllExpansions}
        icon={hasExpandedHook ? faCompress : faExpand}
      />
    </SContainer>
  );
};

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* add bottom padding so page doesn't jump when expanding/contracting hooks */
  padding-bottom: 20rem;
`;

const SNotFoundHeading = styled(SHeadingSubSubtitle)`
  font-weight: 500;
  margin-top: ${theme.spacing.md};
`;

const SList = styled(SContentBoxList)`
  margin-top: ${theme.spacing.md};
`;