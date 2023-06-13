import { collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { Note } from "../models/note.model";
import { FirebaseDB } from "../../common/firebase/config";
import {
  createNoteFailure,
  createNoteSatart,
  deleteNoteFailure,
  deleteNoteSatart,
  deleteNoteSuccess,
  editNoteFailure,
  editNoteStart,
  editNoteSuccess,
  loadNotesFailure,
  loadNotesStart,
  loadNotesSuccess,
} from "./journal.slice";
import { loadNotes } from "../../journal/helpers/journal.helpert";
import Swal from "sweetalert2";
import { AppDispatch } from "../../common";
import { RootState } from "../../common/store/store";

export const createNoteAsync = (note: Omit<Note, "id">) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uuid } = getState().auth;
    dispatch(createNoteSatart());
    try {
      const newDocument = doc(collection(FirebaseDB, `${uuid}/journal/notes`));
      const newNote = { ...note, id: newDocument.id };
      await setDoc(newDocument, newNote);
      Swal.fire({
        title: "Success",
        text: "Note created successfully",
        toast: true,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        position: "top-right",
      });
    } catch (error: any) {
      dispatch(createNoteFailure(error.message));
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

export const editNoteAsync = (editNote: Note) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uuid } = getState().auth;
    if (!uuid) return;
    dispatch(editNoteStart());
    try {
      const existingNoteRef = doc(
        FirebaseDB,
        `${uuid}/journal/notes/${editNote.id}`
      );
      let noteResult = await getDoc(existingNoteRef);
      if (!noteResult.data()) throw new Error("Note Not found");
      const noteData = noteResult.data() as Note;
      const finalEditedNote = { ...editNote, id: noteData.id };
      await setDoc(existingNoteRef, finalEditedNote);
      dispatch(editNoteSuccess());
      Swal.fire({
        title: "Success",
        text: "Note edited successfully",
        toast: true,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        position: "top-right",
      });
    } catch (error) {
      dispatch(editNoteFailure(error));
    }
  };
};

export const deleteNoteAsync = (deleteNoteId: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uuid } = getState().auth;
    if (!uuid) return;
    dispatch(deleteNoteSatart());
    try {
      const existingNoteRef = doc(
        FirebaseDB,
        `${uuid}/journal/notes/${deleteNoteId}`
      );
      await deleteDoc(existingNoteRef);
      dispatch(deleteNoteSuccess());

      Swal.fire({
        title: "Success",
        text: "Note deleted successfully",
        toast: true,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        position: "top-right",
      });
    } catch (error) {
      dispatch(deleteNoteFailure(error));
    }
  };
};
