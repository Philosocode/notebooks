import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import omit from "lodash/omit";

import { INotebook, INotebookState } from "./notebook.types";
import { createNotebook, deleteNotebook, getNotebooks, updateNotebook } from "./notebook.thunks";
import { deleteNotebookTag, deleteTagFromNotebook, updateNotebookTag } from "./notebook-tag.thunk";
import { createSection, deleteSection, getSection, getSections } from "section/redux/section.thunks";
import { IRepositionEntityPayload } from "shared/types.shared";

const initialState: INotebookState = {
  notebooks: {},
  currentNotebookId: undefined,
};

const notebookSlice = createSlice({
  name: "notebook",
  initialState,
  reducers: {
    setCurrentNotebookId: (state, action: PayloadAction<string>) => {
      state.currentNotebookId = action.payload;
    },
    repositionSection: (state, action: PayloadAction<IRepositionEntityPayload>) => {
      const { ownerEntityId: notebookId, oldIndex, newIndex } = action.payload;

      const sectionIds = state.notebooks[notebookId].sectionIds;
      if (!sectionIds) return;

      const [sectionToReposition] = sectionIds.splice(oldIndex, 1);
      sectionIds.splice(newIndex, 0, sectionToReposition);
    }
  },
  extraReducers: (builder) => {
    builder
      /* Notebook */
      .addCase(createNotebook.fulfilled, (state, action) => {
        state.notebooks[action.payload.id] = action.payload;
      })
      .addCase(getNotebooks.fulfilled, (state, action) => {
        state.notebooks = action.payload.reduce<{[key: string]: INotebook}>((hash, notebook) => {
          hash[notebook.id] = notebook;

          return hash;
        }, {});
      })
      .addCase(updateNotebook.fulfilled, (state, action) => {
        const { notebookId, updates } = action.payload;

        state.notebooks[notebookId] = {
          ...state.notebooks[notebookId],
          ...updates,
          updated_at: new Date().toUTCString()
        };
      })
      .addCase(deleteNotebook.fulfilled, (state, action) => {
        state.notebooks = omit(state.notebooks, [action.payload]);
      })

      /* Notebook Tag */
      .addCase(updateNotebookTag.fulfilled, (state, action) => {
        const { newTagName, oldTagName } = action.payload;

        // loop through all the concepts
        Object.values(state.notebooks).forEach((m) => {
          const notebookTags = m.tags;
          // find the concepts with the oldTagName
          if (notebookTags.includes(oldTagName)) {
            // remove the old tag
            const tagSet = new Set(notebookTags);
            tagSet.delete(oldTagName);

            // add new tag
            tagSet.add(newTagName);

            m.tags = Array.from(tagSet).sort();
          }
        });
      })
      .addCase(deleteTagFromNotebook.fulfilled, (state, action) => {
        const { notebookId, tagName } = action.payload;

        const notebookTags = state.notebooks[notebookId].tags;

        const tagIndex = notebookTags.findIndex((t) => t === tagName);
        if (tagIndex === -1) return;

        notebookTags.splice(tagIndex, 1);
      })
      .addCase(deleteNotebookTag.fulfilled, (state, action) => {
        const tagToRemove = action.payload;

        // loop through all concepts
        Object.values(state.notebooks).forEach((notebook) => {
          const tagIdx = notebook.tags.findIndex((t) => t === tagToRemove);

          if (tagIdx !== -1) notebook.tags.splice(tagIdx, 1);
        });
      })

      /* Sections */
      .addCase(getSections.fulfilled, (state, action) => {
        const { notebookId, sections } = action.payload;

        const notebookToUpdate = state.notebooks[notebookId];
        const sectionIds = sections.map(section => section.id);

        if (!notebookToUpdate.sectionIds) notebookToUpdate.sectionIds = [];
        notebookToUpdate.sectionIds.push(...sectionIds);
      })
      .addCase(getSection.fulfilled, (state, action) => {
        const { section } = action.payload;

        const notebookToUpdate = state.notebooks[section.notebook_id];
        if (!notebookToUpdate) return;

        if (!notebookToUpdate.sectionIds) notebookToUpdate.sectionIds = [];

        notebookToUpdate.sectionIds.push(section.id);
      })
      .addCase(createSection.fulfilled, (state, action) => {
        const { notebookId, section } = action.payload;

        const notebookToUpdate = state.notebooks[notebookId];

        if (!notebookToUpdate.sectionIds) notebookToUpdate.sectionIds = [];
        notebookToUpdate.sectionIds.push(section.id);
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        const { notebookId, section } = action.payload;

        const notebookToUpdate = state.notebooks[notebookId];

        if (!notebookToUpdate.sectionIds) return;

        // remove the section ID from the array
        const sectionIdIndex = notebookToUpdate.sectionIds.findIndex(id => id === section.id);
        if (sectionIdIndex === -1) return;

        notebookToUpdate.sectionIds.splice(sectionIdIndex, 1);
      })
  },
});

export const notebookReducer = notebookSlice.reducer;
export const { setCurrentNotebookId, repositionSection } = notebookSlice.actions;