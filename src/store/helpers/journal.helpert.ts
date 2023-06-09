import { collection, getDocs } from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import { Note } from "../../store/models/note.model";

export const loadNotes = async (userId: string) => {
  if (!userId) throw new Error("User Does not exist");

  const collectionRef = collection(FirebaseDB, `${userId}/journal/notes`);
  const noteDocs = await getDocs(collectionRef);

  const notes: Note[] = [];
  noteDocs.forEach((noteDoc) =>
    notes.push({ id: noteDoc.id, ...noteDoc.data() } as Note)
  );
  return notes;
};
