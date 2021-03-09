import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import omit from "lodash/omit";

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
import { IConcept, IConceptState } from "./concept.types";
import { IHook } from "hook/redux/hook.types";
import { createHook, deleteHook, getHooks, updateHook } from "hook/redux/hook.thunks";
import { IRepositionEntityPayload } from "../../shared/types.shared";

// tag === "" means "All"
const initialState: IConceptState = {
  concepts: {},
  currentConceptId: undefined,
};

const conceptSlice = createSlice({
  name: "concept",
  initialState,
  reducers: {
    setCurrentConceptId: (state, action: PayloadAction<string>) => {
      state.currentConceptId = action.payload;
    },
    repositionHook: (
      state,
      action: PayloadAction<IRepositionEntityPayload>
    ) => {
      const { ownerEntityId: conceptId, oldIndex, newIndex } = action.payload;

      const hooks = state.concepts[conceptId].hooks;
      if (!hooks) return;

      const [hookToReposition] = hooks.splice(oldIndex, 1);
      hooks.splice(newIndex, 0, hookToReposition);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createConcept.fulfilled, (state, action) => {
        const newConcept = action.payload;

        state.concepts[newConcept.id] = newConcept;
      })
      .addCase(deleteConcept.fulfilled, (state, action) => {
        state.concepts = omit(state.concepts, [action.payload]);
      })
      .addCase(getConcept.fulfilled, (state, action) => {
        state.currentConceptId = action.payload.id;
      })
      .addCase(getConcepts.fulfilled, (state, action) => {
        state.concepts = action.payload.reduce<{[key: string]: IConcept}>((hash, concept) => {
          hash[concept.id] = concept;

          return hash;
        }, {});
      })
      .addCase(updateConcept.fulfilled, (state, action) => {
        const { id, updates } = action.payload;

        const conceptToUpdate = state.concepts[id];
        if (!conceptToUpdate) return;

        state.concepts[id] = {
          ...state.concepts[id],
          ...updates,
          updated_at: new Date().toUTCString()
        }
      })
      .addCase(deleteTagFromConcept.fulfilled, (state, action) => {
        const { conceptId, tagName } = action.payload;
        const conceptTags = state.concepts[conceptId].tags;

        const tagIdx = conceptTags.findIndex((t) => t === tagName);
        if (tagIdx === -1) return;

        conceptTags.splice(tagIdx, 1);
      })

      /* Concept Tag */
      .addCase(updateConceptTag.fulfilled, (state, action) => {
        const { newTagName, oldTagName } = action.payload;

        // loop through all the concepts
        Object.values(state.concepts).forEach((c) => {
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
        Object.values(state.concepts).forEach((concept) => {
          const tagIdx = concept.tags.findIndex((t) => t === tagToRemove);
          if (tagIdx !== -1) concept.tags.splice(tagIdx, 1);
        });
      })

      /* Hooks */
      .addCase(getHooks.fulfilled, (state, action) => {
        const { conceptId, hooks } = action.payload;

        state.concepts[conceptId].hooks = hooks;
      })
      .addCase(createHook.fulfilled, (state, action) => {
        const { conceptId, hook } = action.payload;

        const conceptToUpdate = state.concepts[conceptId];
        if (!conceptToUpdate.hooks) conceptToUpdate.hooks = [];

        conceptToUpdate.hooks.push(hook);
      })
      .addCase(updateHook.fulfilled, (state, action) => {
        const { conceptId, hookId, updates } = action.payload;

        const hooks = state.concepts[conceptId].hooks;
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

        const hooks = state.concepts[conceptId].hooks;
        if (!hooks) return;

        // remove hook
        const hookIndex = getHookIndex(hooks, hookId);
        if (hookIndex === -1) return;

        hooks.splice(hookIndex, 1);
      })
      // Concept Links
      .addCase(createConceptLink.fulfilled, (state, action) => {
        const { currentConceptId, otherConceptId, id } = action.payload;

        const currentConcept = state.concepts[currentConceptId];
        currentConcept.links?.push({ id, concept_id: otherConceptId });

        const otherConcept = state.concepts[otherConceptId];
        otherConcept.links?.push({ id, concept_id: currentConceptId });
      })
      .addCase(getConceptLinks.fulfilled, (state, action) => {
        const { currentConceptId } = state;

        if (!currentConceptId) return;

        const currentConcept = state.concepts[currentConceptId];
        currentConcept.links = action.payload;
      })
      .addCase(deleteConceptLink.fulfilled, (state, action) => {
        const { currentConceptId, otherConceptId, linkId } = action.payload;

        removeLinkFromConcept(state.concepts[currentConceptId], linkId);
        removeLinkFromConcept(state.concepts[otherConceptId], linkId);
      })
  }
});

export const conceptReducer = conceptSlice.reducer;
export const {
  setCurrentConceptId,
  repositionHook,
} = conceptSlice.actions;

/* HELPERS */
function getHookIndex(hooks: IHook[], hookId: string) {
  return hooks.findIndex(hook => hook.id === hookId);
}

function removeLinkFromConcept(concept: IConcept, linkId: string) {
  const conceptLinks = concept.links;
  if (!conceptLinks) return;

  const linkIndex = conceptLinks.findIndex(link => link.id === linkId);
  if (linkIndex === -1) return;

  conceptLinks.splice(linkIndex, 1);
}