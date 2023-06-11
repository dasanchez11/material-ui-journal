import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks/useAppSelector.hook";
import { Note } from "../store/models/note.model";

const emptyNote: Note = {
  id: "",
  title: "",
  body: "",
  date: new Date().getTime(),
  imageUrls: [],
};

export const useActiveNote = () => {
  const [activeNote, setActiveNote] = useState<Note>(emptyNote);
  const [newNote, setNewNote] = useState<boolean>(false);
  const { noteId } = useParams();
  const navigate = useNavigate();
  const { notes } = useAppSelector((state) => state.journal);
  useEffect(() => {
    if (noteId) {
      const foundNote = notes.find((note) => note.id === noteId);
      if (!foundNote) return navigate("/notes/create");
      setActiveNote(foundNote);
      setNewNote(false);
    } else {
      setActiveNote(emptyNote);
      setNewNote(true);
    }
  }, [noteId]);
  return { activeNote, newNote };
};
