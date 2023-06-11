import { Note } from "../models/note.model";

export const editNote = (notes: Note[], editedNote: Note) => {
  return notes.map((note) => {
    // console.log(current(note));
    let newNote = note;
    if (note.id === editedNote.id) {
      newNote = editedNote;
    }
    return newNote;
  });
};
