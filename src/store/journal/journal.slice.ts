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
    addNewEmptyNote: (state, action) => {
      state = { ...state, notes: [...state.notes, action.payload] };
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.activeNote = action.payload;
    },
    savingStart: (state) => {
      state.isSaving = true;
      state.errors = null;
    },
    savingFailure: (state, action) => {
      state.isSaving = false;
      state.errors = action.payload;
    },
    updateNote: (state, action) => {},
    deleteNoteById: (state, action) => {},
  },
});

export const {
  addNewEmptyNote,
  setActiveNote,
  loadNotesStart,
  loadNotesSuccess,
  loadNotesFailure,
  savingStart,
  savingFailure,
  updateNote,
} = journalSlice.actions;
