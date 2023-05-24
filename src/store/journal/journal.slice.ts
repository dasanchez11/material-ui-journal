import { createSlice } from "@reduxjs/toolkit";
import { JournalState } from "../models/note.model";

export const journalInitialState: JournalState = {
  isSaving: true,
  messageSaved: "",
  notes: [],
  activeNote: null,
};

export const journalSlice = createSlice({
  name: "journal",
  initialState: journalInitialState,
  reducers: {
    addNewEmptyNote: (state, action) => {},
    setActiveNote: (state, action) => {},
    setNotes: (state, action) => {},
    setSaving: (state, action) => {
      state.isSaving = true;
    },
    updateNote: (state, action) => {},
    deleteNoteById: (state, action) => {},
  },
});

export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
} = journalSlice.actions;
