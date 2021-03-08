import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  createConcept, createConceptLink,
  deleteConcept,
  deleteConceptLink,
  deleteTagFromConcept,
  getConcept,
  getConceptLinks,
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

      const conceptIndex = getConceptIndex(state.concepts, conceptId);
      if (conceptIndex === -1) return;

      const hooks = state.concepts[conceptIndex].hooks;
      if (!hooks) return;

      const [hookToReposition] = hooks.splice(oldIndex, 1);
      hooks.splice(newIndex, 0, hookToReposition);
    },
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
        const { id, updates } = action.payload;

        const conceptIndex = getConceptIndex(state.concepts, id);
        if (conceptIndex === -1) return;

        state.concepts[conceptIndex] = {
          ...state.concepts[conceptIndex],
          ...updates,
          updated_at: new Date().toUTCString()
        };
      })
      .addCase(deleteTagFromConcept.fulfilled, (state, action) => {
        const { conceptId, tagName } = action.payload;

        const conceptIndex = getConceptIndex(state.concepts, conceptId);
        const conceptTags = state.concepts[conceptIndex].tags;

        const tagIdx = conceptTags.findIndex((t) => t === tagName);
        if (tagIdx === -1) return;

        conceptTags.splice(tagIdx, 1);
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
        const conceptIndex = getConceptIndex(state.concepts, conceptId);
        if (conceptIndex === -1) return;

        state.concepts[conceptIndex].hooks = hooks;
      })
      .addCase(createHook.fulfilled, (state, action) => {
        const { conceptId, hook } = action.payload;

        const conceptIndex = getConceptIndex(state.concepts, conceptId);
        if (conceptIndex === -1) return;

        const conceptToUpdate = state.concepts[conceptIndex];
        if (!conceptToUpdate.hooks) conceptToUpdate.hooks = [];

        conceptToUpdate.hooks.push(hook);
      })
      .addCase(updateHook.fulfilled, (state, action) => {
        const { conceptId, hookId, updates } = action.payload;

        const conceptIndex = getConceptIndex(state.concepts, conceptId);
        if (conceptIndex === -1) return;

        const hooks = state.concepts[conceptIndex].hooks;
        if (!hooks) return;

        // remove hook
        let hookIndex = getHookIndex(hooks, hookId);
        if (hookIndex === -1) return;

        hooks[hookIndex] = {
          ...hooks[hookIndex],
          ...updates,
          updated_at: new Date().toUTCString()
        }
      })
      .addCase(deleteHook.fulfilled, (state, action) => {
        const { conceptId, hookId } = action.payload;

        // find concept to update
        const conceptToUpdateIndex = getConceptIndex(state.concepts, conceptId);
        if (conceptToUpdateIndex === -1) return;

        const hooks = state.concepts[conceptToUpdateIndex].hooks;
        if (!hooks) return;

        // remove hook
        const hookIndex = getHookIndex(hooks, hookId);
        if (hookIndex === -1) return;

        hooks.splice(hookIndex, 1);
      })
      // Concept Links
      .addCase(createConceptLink.fulfilled, (state, action) => {
        const { currentConceptId, otherConceptId, id } = action.payload;

        addLinkToConcept(state.concepts, currentConceptId, otherConceptId, id);
        addLinkToConcept(state.concepts, otherConceptId, currentConceptId, id);
      })
      .addCase(getConceptLinks.fulfilled, (state, action) => {
        const {currentConceptId} = state;
        if (!currentConceptId) return;

        const currentConceptIndex = getConceptIndex(state.concepts, currentConceptId);
        if (currentConceptIndex === -1) return;

        const currentConcept = state.concepts[currentConceptIndex];
        currentConcept.links = action.payload;
      })
      .addCase(deleteConceptLink.fulfilled, (state, action) => {
        const { currentConceptId, otherConceptId, linkId } = action.payload;

        removeLinkFromConcept(state.concepts, currentConceptId, linkId);
        removeLinkFromConcept(state.concepts, otherConceptId, linkId);
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
function getConceptIndex(concepts: IConcept[], conceptId: string) {
  return concepts.findIndex((c) => c.id === conceptId);
}

function getHookIndex(hooks: IHook[], hookId: string) {
  return hooks.findIndex(hook => hook.id === hookId);
}

function addLinkToConcept(concepts: IConcept[], conceptId: string, otherConceptId: string, linkId: string) {
  const conceptIndex = getConceptIndex(concepts, conceptId);
  if (conceptIndex === -1) return;

  const conceptLinks = concepts[conceptIndex].links;
  if (!conceptLinks) return;

  conceptLinks.push({ id: linkId, concept_id: otherConceptId });
}

function removeLinkFromConcept(concepts: IConcept[], conceptId: string, linkId: string) {
  const conceptIndex = getConceptIndex(concepts, conceptId);
  if (conceptIndex === -1) return;

  const conceptLinks = concepts[conceptIndex].links;
  if (!conceptLinks) return;

  const linkIndex = conceptLinks.findIndex(link => link.id === linkId);
  if (linkIndex === -1) return;

  conceptLinks.splice(linkIndex, 1);
}