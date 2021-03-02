import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { DropResult } from "react-beautiful-dnd";

// logic
import { IHook } from "../redux/hook.types";
import { repositionHook } from "concept/redux/concept.slice";
import { updateHookPosition } from "../redux/hook.thunks";
import { useExpandHash } from "shared/hooks/use-expand-hash.hook";
import { useEntityFilterSort } from "shared/hooks/use-entity-filter-sort.hook";

// components
import { HookListItem } from "./hook-list-item.component";

// styles
import { theme } from "../../shared/styles/theme.style";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";
import { faCompress, faExpand } from "@fortawesome/free-solid-svg-icons";
import { FloatingCornerButton } from "../../shared/components/button/floating-corner-button.component";
import { SortFilterControls } from "../../shared/components/button/sort-filter-controls.component";
import { DragAndDropWrapper } from "shared/components/drag-and-drop/drag-and-drop-wrapper.component";

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
  } = useEntityFilterSort<IHook>(hooks, "title");

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

  const hasExpandedHook = hasExpandedEntity();
  const dragDisabled = filterText.trim() === "" && sortMode !== "custom";

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

      {filteredHooks.length === 0 && <SNoHooksHeading>No hooks found...</SNoHooksHeading>}
      <DragAndDropWrapper droppableId="hook-list-droppable" handleDragEnd={handleDragEnd}>
        <SHookList>
          {filteredHooks.map((hook, index) => (
            <HookListItem
              dragDisabled={dragDisabled}
              key={hook.id}
              hook={hook}
              index={index}
              isExpanded={expandedHash[hook.id]}
              toggleIsExpanded={toggleEntityExpansion}
            />
          ))}
        </SHookList>
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

const SNoHooksHeading = styled(SHeadingSubSubtitle)`
  font-weight: 500;
  margin-top: ${theme.spacing.md};
`;

const SHookList = styled.ul`
  margin-top: ${theme.spacing.md};
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
`;