import { createAsyncThunk } from "@reduxjs/toolkit";

import { IFlashcard } from "./flashcard.types";
import { api } from "../../services/api.service";

interface ICreateFlashcardPayload {
  sectionId: string;
  initialValues: {
    question: string;
    answer: string;
  }
}
interface ICreateFlashcardResponse {
  status: string;
  data: {
    flashcard: IFlashcard;
  }
}
export const createFlashcard = createAsyncThunk(
  "flashcard/createFlashcard",
  async function (payload: ICreateFlashcardPayload, thunkAPI) {
    const { initialValues, sectionId } = payload;
    try {
      const response = await api.post<ICreateFlashcardResponse>(
        `/sections/${sectionId}/flashcards`, initialValues
      );

      const { flashcard } = response.data.data;

      return { flashcard, sectionId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IGetFlashcardsResponse {
  status: string;
  data: {
    flashcards: IFlashcard[];
  };
}
export const getFlashcards = createAsyncThunk(
  "flashcard/getFlashcards",
  async function (sectionId: string, thunkAPI) {
    try {
      const response = await api.get<IGetFlashcardsResponse>(`/sections/${sectionId}/flashcards`);
      const { flashcards } = response.data.data;

      return { flashcards, sectionId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export interface IUpdateFlashcardPayload {
  sectionId: string;
  flashcardId: string;
  updates: {
    question?: string;
    answer?: string;
    mastered?: boolean;
  }
}
export const updateFlashcard = createAsyncThunk(
  "flashcard/updateFlashcard",
  async function (payload: IUpdateFlashcardPayload, thunkAPI) {
    const { sectionId, flashcardId, updates } = payload;

    try {
      await api.patch(`/sections/${sectionId}/flashcards/${flashcardId}`, updates);

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IUpdateFlashcardPosition {
  sectionId: string;
  flashcardId: string;
  newPosition: number;
}
export const updateFlashcardPosition = createAsyncThunk(
  "flashcard/updateFlashcardPosition",
  async function (payload: IUpdateFlashcardPosition, thunkAPI) {
    const {sectionId, flashcardId, newPosition } = payload;

    try {
      await api.patch(`/sections/${sectionId}/flashcards/${flashcardId}`, { position: newPosition });
    } catch(err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IDeleteFlashcardPayload {
  sectionId: string;
  flashcardId: string;
}
export const deleteFlashcard = createAsyncThunk(
  "flashcard/deleteFlashcard",
  async function (payload: IDeleteFlashcardPayload, thunkAPI) {
    const { sectionId, flashcardId } = payload;

    try {
      await api.delete(`/sections/${sectionId}/flashcards/${flashcardId}`);

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);