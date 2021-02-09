import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createConcept,
  deleteConcept,
  deleteTagFromConcept,
  getConcepts,
  updateConcept,
} from "./concept.thunks";
import { deleteConceptTag, updateConceptTag } from "./concept-tag.thunk";
import { IConceptFiltersState, IConceptState } from "./concept.types";

// tag === "" means "All"
const initialState: IConceptState = {
  concepts: [],
  currConcept: undefined,
  filters: {
    isUncategorized: false,
    tag: "",
  },
};

const conceptSlice = createSlice({
  name: "concept",
  initialState,
  reducers: {
    setCurrConceptTag: (state, action: PayloadAction<string>) => {
      state.filters.tag = action.payload;
      state.filters.isUncategorized = false;
    },
    setConceptFilters: (state, action: PayloadAction<Partial<IConceptFiltersState>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      }
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
      .addCase(getConcepts.fulfilled, (state, action) => {
        state.concepts = action.payload;
      })
      .addCase(updateConcept.fulfilled, (state, action) => {
        const { id, name, tags } = action.payload;

        const conceptToUpdateIdx = state.concepts.findIndex((c) => c.id === id);

        state.concepts[conceptToUpdateIdx].name = name;
        state.concepts[conceptToUpdateIdx].tags = tags;
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
      });
  },
});

export const conceptReducer = conceptSlice.reducer;
export const { setCurrConceptTag, setConceptFilters } = conceptSlice.actions;
