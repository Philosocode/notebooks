import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

// logic
import { IHook } from "../redux/hook.types";
import { repositionHook } from "concept/redux/concept.slice";
import { updateHookPosition } from "../redux/hook.thunks";
import { useExpandHash } from "../../shared/hooks/use-expand-hash.hook";
import { useFilterSort } from "../../shared/hooks/use-filter-sort.hook";

// components
import { HookListControls } from "./hook-list-controls.component";
import { HookListItem } from "./hook-list-item.component";

// styles
import { theme } from "../../shared/styles/theme.style";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";
import { faCompress, faExpand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SButton } from "../../shared/styles/button.style";
import { SInputBorderless } from "../../shared/styles/form.style";

interface IProps {
  conceptId: string;
  hooks: IHook[];
}

export const HookList: React.FC<IProps> = ({ conceptId, hooks }) => {
  const dispatch = useDispatch();

  const [filterText, setFilterText] = useState("");

  const { expandedHash, toggleEntityExpansion, hasExpandedEntity, toggleAllExpansions } = useExpandHash(hooks);
  const {
    filteredEntities: filteredHooks
  } = useFilterSort<IHook>(hooks, "title", filterText);

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
      newPosition: newIndex,
    }));
  }

  const hasExpandedHook = hasExpandedEntity();

  return (
    <SContainer>
      <SHeadingSubSubtitle># Hooks: {hooks.length}</SHeadingSubSubtitle>

      <SControls>
        <SExpandButton onClick={toggleAllExpansions}>
          <SExpandIcon icon={hasExpandedHook ? faCompress : faExpand} />
          { hasExpandedHook ? "Collapse All" : "Expand All" }
        </SExpandButton>
        <SInput
          placeholder="Enter filter text..."
          onChange={handleFilterTextChange}
          value={filterText}
        />
      </SControls>

      { filteredHooks.length === 0 && <SNoHooksHeading>No hooks found...</SNoHooksHeading> }
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
\`;
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