import { useEffect } from "react";
import { Note } from "../store/models/note.model";
import { collection, onSnapshot } from "firebase/firestore";
import { FirebaseDB } from "../firebase/config";
import { useAppSelector } from "../store/hooks/useAppSelector.hook";
import { useAppDispatch } from "../store";
import { loadNotesSuccess } from "../store/journal/journal.slice";

export const useNotes = () => {
  const { uuid } = useAppSelector((state) => state.auth);
  const existingNoteRef = collection(FirebaseDB, `${uuid}/journal/notes`);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (uuid) {
      const unsubscription$ = onSnapshot(existingNoteRef, async (snapshot) => {
        let data: Note[] = [];
        snapshot.forEach((doc) => {
          const note = { id: doc.id, ...doc.data() } as Note;
          data.push(note);
        });
        dispatch(loadNotesSuccess(data));
      });

      return () => unsubscription$();
    }
  }, [uuid]);
};
