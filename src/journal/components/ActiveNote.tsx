import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NoteView, NothingSelectedView } from "../views";
import { Note } from "../../store/models/note.model";
import { useAppSelector } from "../../store/hooks/useAppSelector.hook";

export const ActiveNote = () => {
  const { noteId } = useParams();
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const { notes } = useAppSelector((state) => state.journal);

  useEffect(() => {
    let note = null;
    if (noteId && !!notes) {
      note = notes.find((note) => note.id === noteId) || null;
    }
    setActiveNote(note);
  }, [noteId, notes]);

  return !!activeNote ? (
    <NoteView note={activeNote} />
  ) : (
    <NothingSelectedView />
  );
};
