import { collection, doc, setDoc } from "firebase/firestore";
import { AppDispatch, RootState } from "..";
import { Note } from "../models/note.model";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  loadNotesFailure,
  loadNotesStart,
  loadNotesSuccess,
  savingFailure,
  savingStart,
  setActiveNote,
} from "./journal.slice";
import { loadNotes } from "../helpers/journal.helpert";

export const noteStartAsync = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uuid } = getState().auth;
    let newNote: Partial<Note> = {
      title: "Diego",
      body: "Sanchez",
      date: new Date().getTime(),
      imageUrls: [],
    };
    dispatch(savingStart());
    try {
      dispatch(setActiveNote(newNote));
      const newDocument = doc(collection(FirebaseDB, `${uuid}/journal/notes`));
      newNote = { ...newNote, id: newDocument.id };
      await setDoc(newDocument, newNote);
      dispatch(addNewEmptyNote(newNote));
    } catch (error: any) {
      dispatch(savingFailure(error.message));
    }
  };
};

export const loadNotesAsync = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uuid } = getState().auth;
    if (!uuid) return;
    dispatch(loadNotesStart());
    try {
      const notes = await loadNotes(uuid);
      dispatch(loadNotesSuccess(notes));
    } catch (error) {
      loadNotesFailure(error);
    }
  };
};
