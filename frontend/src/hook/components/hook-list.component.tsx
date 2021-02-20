import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SButton } from "../../shared/styles/button.style";
import { SInputBorderless } from "../../shared/styles/form.style";
import { useEntityFilter } from "../../shared/hooks/use-entity-filter.hook";

interface IProps {
  conceptId: string;
  hooks: IHook[];
}

export const HookList: React.FC<IProps> = ({ conceptId, hooks }) => {
  const dispatch = useDispatch();

  const {
    filteredEntities: filteredHooks,
    filterText,
    setFilterText,
    sortMode,
    setSortMode,
    getSortIconCaret,
    handleSortClick,
  } = useEntityFilterSort<IHook>(hooks, "title");

  const {
    expandedHash,
    toggleEntityExpansion,
    hasExpandedEntity,
    toggleAllExpansions
  } = useExpandHash(hooks);

  function handleFilterTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFilterText(event.target.value);
  }

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

      <SControls>
        <SExpandButton onClick={toggleAllExpansions}>
          <SExpandIcon icon={hasExpandedHook ? faCompress : faExpand} />
          {hasExpandedHook ? "Collapse All" : "Expand All"}
        </SExpandButton>
        <SInput
          placeholder="Filter by hook title..."
          onChange={handleFilterTextChange}
          value={filterText}
        />
        <SSortButtons>
          <SSortButton
            isSelected={sortMode === "alphabetical"}
            onClick={() => handleSortClick("alphabetical")}
          >
            A-Z <SSortIcon icon={getSortIconCaret("alphabetical")} />
          </SSortButton>
          <SSortButton
            isSelected={sortMode === "created"}
            onClick={() => handleSortClick("created")}
          >
            Created <SSortIcon icon={getSortIconCaret("created")} />
          </SSortButton>
          <SSortButton
            isSelected={sortMode === "updated"}
            onClick={() => handleSortClick("updated")}
          >
            Updated <SSortIcon icon={getSortIconCaret("updated")} />
          </SSortButton>
          <SSortButton isSelected={sortMode === "custom"} onClick={() => setSortMode("custom")}>
            Custom
          </SSortButton>
        </SSortButtons>
      </SControls>

      {filteredHooks.length === 0 && <SNoHooksHeading>No hooks found...</SNoHooksHeading>}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="hook-list-droppable">
          {((provided) => (
            <SDroppableContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
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
              {provided.placeholder}
            </SDroppableContainer>
          ))}
        </Droppable>
      </DragDropContext>
    </SContainer>
  );
};

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  // add bottom padding so page doesn't jump when expanding/contracting hooks
  padding-bottom: 20rem;
\` ;
`;

const SControls = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${theme.spacing.base};
  width: 100%;
`;

const SExpandIcon = styled(FontAwesomeIcon)`
  margin-right: ${theme.spacing.sm};
`;

const SExpandButton = styled(SButton)`
  box-shadow: none;
  margin: 0 auto;
  width: max-content;
`;

const SSortIcon = styled(FontAwesomeIcon)`
  font-size: 1.8rem;
  margin-left: ${theme.spacing.xs};
`;

const SSortButtons = styled.div`
  margin-top: ${theme.spacing.sm};
`;

interface SSortButtonProps {
  isSelected: boolean;
}

const SSortButton = styled.button<SSortButtonProps>`
  background: ${props => props.isSelected && theme.colors.green[400]};
  color: ${props => props.isSelected && theme.colors.white};
  border: none;
  cursor: pointer;
  margin-left: ${theme.spacing.xs};
  margin-right: ${theme.spacing.xs};
  padding: ${theme.spacing.xs};
  font-weight: 500;
  width: 12rem;

  &:active,
  &:focus {
    outline: none;
  }
`;

const SNoHooksHeading = styled(SHeadingSubSubtitle)`
  font-weight: 500;
  margin-top: ${theme.spacing.md};
`;

const SInput = styled(SInputBorderless)`
  margin-top: ${theme.spacing.base};
  max-width: 40rem;
`;

const SDroppableContainer = styled.div`
  list-style-type: none;
  width: 100%;
`;

const SHookList = styled.ul`
  margin-top: ${theme.spacing.md};
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
`;