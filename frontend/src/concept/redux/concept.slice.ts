import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  createConcept,
  deleteConcept,
  deleteTagFromConcept,
  getConcept,
  getConcepts,
  updateConcept,
} from "./concept.thunks";
import { deleteConceptTag, updateConceptTag } from "./concept-tag.thunk";
import { IConcept, IConceptFiltersState, IConceptState } from "./concept.types";
import { IHook } from "hook/redux/hook.types";
import { createHook, deleteHook, getHooks, updateHook } from "hook/redux/hook.thunks";
import { IRepositionEntityPayload } from "../../shared/types.shared";

// tag === "" means "All"
const initialState: IConceptState = {
  concepts: [],
  currentConceptId: undefined,
  filters: {
    isUncategorized: false,
    tag: "",
  },
};

const conceptSlice = createSlice({
  name: "concept",
  initialState,
  reducers: {
    setCurrentConceptId: (state, action: PayloadAction<string>) => {
      state.currentConceptId = action.payload;
    },
    setCurrentConceptTag: (state, action: PayloadAction<string>) => {
      state.filters.tag = action.payload;
      state.filters.isUncategorized = false;
    },
    setConceptFilters: (
      state,
      action: PayloadAction<Partial<IConceptFiltersState>>
    ) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    repositionHook: (
      state,
      action: PayloadAction<IRepositionEntityPayload>
    ) => {
      const { ownerEntityId: conceptId, oldIndex, newIndex } = action.payload;

      const conceptWithHook = findConcept(state.concepts, conceptId);
      const hooks = conceptWithHook?.hooks;
      if (!hooks) return;

      const [hookToReposition] = hooks.splice(oldIndex, 1);
      hooks.splice(newIndex, 0, hookToReposition);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createConcept.fulfilled, (state, action) => {
        state.concepts.push(action.payload);
      })
      .addCase(deleteConcept.fulfilled, (state, action) => {
        const foundIdx = state.concepts.findIndex(
          (c) => c.id === action.payload
        );

        if (foundIdx !== -1) {
          state.concepts.splice(foundIdx, 1);
        }
      })
      .addCase(getConcept.fulfilled, (state, action) => {
        state.currentConceptId = action.payload.id;
      })
      .addCase(getConcepts.fulfilled, (state, action) => {
        state.concepts = action.payload;
      })
      .addCase(updateConcept.fulfilled, (state, action) => {
        const { id, name, tags } = action.payload;

        const conceptToUpdateIdx = state.concepts.findIndex((c) => c.id === id);

        state.concepts[conceptToUpdateIdx].name = name;
        state.concepts[conceptToUpdateIdx].tags = tags;
        state.concepts[conceptToUpdateIdx].updated_at = new Date().toUTCString();
      })
      .addCase(deleteTagFromConcept.fulfilled, (state, action) => {
        // remove the tag from the concept
        const { conceptId, tagName } = action.payload;
        const conceptToUpdateIdx = state.concepts.findIndex(
          (c) => c.id === conceptId
        );
        const conceptTags = state.concepts[conceptToUpdateIdx].tags;

        const tagIdx = conceptTags.findIndex((t) => t === tagName);
        if (tagIdx !== -1) conceptTags.splice(tagIdx, 1);
      })

      /* Concept Tag */
      .addCase(updateConceptTag.fulfilled, (state, action) => {
        const { newTagName, oldTagName } = action.payload;
        // loop through all the concepts
        state.concepts.forEach((c) => {
          const conceptTags = c.tags;
          // find the concepts with the oldTagName
          if (conceptTags.includes(oldTagName)) {
            // remove the old tag
            const tagSet = new Set(conceptTags);
            tagSet.delete(oldTagName);

            // add new tag
            tagSet.add(newTagName);

            c.tags = Array.from(tagSet).sort();
          }
        });
      })
      .addCase(deleteConceptTag.fulfilled, (state, action) => {
        const tagToRemove = action.payload;

        // loop through all concepts
        state.concepts.forEach((concept) => {
          const tagIdx = concept.tags.findIndex((t) => t === tagToRemove);
          if (tagIdx !== -1) concept.tags.splice(tagIdx, 1);
        });

        if (state.filters.tag === tagToRemove) state.filters.tag = "";
      })

      /* Hooks */
      .addCase(getHooks.fulfilled, (state, action) => {
        const { conceptId, hooks } = action.payload;

        // loop through all concepts
        const conceptToUpdate = state.concepts.find(concept => concept.id === conceptId);
        if (conceptToUpdate) conceptToUpdate.hooks = hooks;
      })
      .addCase(createHook.fulfilled, (state, action) => {
        const { conceptId, hook } = action.payload;

        // loop through all concepts
        const conceptToUpdate = state.concepts.find(concept => concept.id === conceptId);
        if (conceptToUpdate) {
          if (!conceptToUpdate.hooks) conceptToUpdate.hooks = [];

          conceptToUpdate.hooks.push(hook);
        }
      })
      .addCase(updateHook.fulfilled, (state, action) => {
        const { conceptId, hookId, updates } = action.payload;

        // find concept to update
        const conceptToUpdateIndex = state.concepts.findIndex(
          (c) => c.id === conceptId
        );

        if (conceptToUpdateIndex === -1) return;

        const conceptToUpdate = state.concepts[conceptToUpdateIndex];
        const hooks = conceptToUpdate.hooks;
        if (!hooks) return;

        // remove hook
        const hookIndex = hooks.findIndex(h => h.id === hookId);
        if (hookIndex !== -1) {
          const oldHook = hooks[hookIndex];
          hooks[hookIndex] = {
            ...oldHook,
            ...updates,
          };
        }
      })
      .addCase(deleteHook.fulfilled, (state, action) => {
        const { conceptId, hookId } = action.payload;

        // find concept to update
        const conceptToUpdateIndex = state.concepts.findIndex(
          (c) => c.id === conceptId
        );

        if (conceptToUpdateIndex === -1) return;

        const hooks = state.concepts[conceptToUpdateIndex].hooks;
        if (!hooks) return;

        // remove hook
        const hookIndex = hooks.findIndex(h => h.id === hookId);
        if (hookIndex === -1) return;
        hooks.splice(hookIndex, 1);
      })
  }
});

export const conceptReducer = conceptSlice.reducer;
export const {
  setCurrentConceptId,
  setCurrentConceptTag,
  setConceptFilters,
  repositionHook,
} = conceptSlice.actions;

/* HELPERS */
function findConcept(concepts: IConcept[], conceptId: string) {
  return concepts.find((c) => c.id === conceptId);
}

function findHook(hooks: IHook[], hookId: string) {
  return hooks.find(hook => hook.id === hookId);
}