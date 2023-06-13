import { createSlice } from "@reduxjs/toolkit";
import { JournalState } from "../models/note.model";

export const journalInitialState: JournalState = {
  isSaving: false,
  messageSaved: "",
  notes: [],
  activeNote: null,
  errors: null,
};

export const journalSlice = createSlice({
  name: "journal",
  initialState: journalInitialState,
  reducers: {
    loadNotesStart: (state) => {
      state.isSaving = true;
    },
    loadNotesSuccess: (state, action) => {
      state.notes = action.payload;
      state.isSaving = false;
    },
    loadNotesFailure: (state, action) => {
      state.errors = action.payload;
      state.isSaving = false;
    },
    editNoteStart: (state) => {
      state.isSaving = true;
    },
    editNoteSuccess: (state) => {
      state.isSaving = false;
    },
    editNoteFailure: (state, action) => {
      state.errors = action.payload;
      state.isSaving = false;
    },
    createNoteSatart: (state) => {
      state.isSaving = true;
    },
    createNoteSuccess: (state) => {
      state.isSaving = false;
    },
    createNoteFailure: (state, action) => {
      state.errors = action.payload;
      state.isSaving = false;
    },
    deleteNoteSatart: (state) => {
      state.isSaving = true;
    },
    deleteNoteSuccess: (state) => {
      state.isSaving = false;
    },
    deleteNoteFailure: (state, action) => {
      state.errors = action.payload;
      state.isSaving = false;
    },
  },
});

export const {
  loadNotesStart,
  loadNotesSuccess,
  loadNotesFailure,
  editNoteStart,
  editNoteSuccess,
  editNoteFailure,
  createNoteSatart,
  createNoteSuccess,
  createNoteFailure,
  deleteNoteSatart,
  deleteNoteSuccess,
  deleteNoteFailure,
} = journalSlice.actions;
