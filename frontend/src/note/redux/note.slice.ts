import { createSlice } from "@reduxjs/toolkit";
import omit from "lodash/omit";

import { INoteState } from "./note.types";
import { createNote, deleteNote, getNotes, updateNote } from "./note.thunks";

const initialState: INoteState  = {
  notes: {}
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNote.fulfilled, (state, action) => {
        const newNote = action.payload.note;

        state.notes[newNote.id] = newNote;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        action.payload.notes.forEach(note => {
          // add to hash
          state.notes[note.id] = note;
        })
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const { noteId, updates } = action.payload;

        const oldNote = state.notes[noteId];

        state.notes[noteId] = {
          ...oldNote,
          ...updates,
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        const { noteId } = action.payload;

        state.notes = omit(state.notes, [noteId]);
      })
  }
});

export const noteReducer = noteSlice.reducer;