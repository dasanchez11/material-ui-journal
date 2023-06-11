import { Navigate, Route, Routes } from "react-router-dom";
import { NoteView, NothingSelectedView } from "../views";

export const NotesRoutes = () => {
  return (
    <Routes>
      <Route path="/notes" element={<NothingSelectedView />} />
      <Route path="/notes/:noteId" element={<NoteView />} />
      <Route path="/notes/create" element={<NoteView />} />
      <Route path="/*" element={<Navigate to="/notes" />} />
    </Routes>
  );
};
