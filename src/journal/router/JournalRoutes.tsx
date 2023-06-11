import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { JournalPage } from "../pages/JournalPage";
import { useNotes } from "../../hooks/useNotes";

export const JournalRoutes = () => {
  useNotes();
  return (
    <Routes>
      <Route path="*" element={<JournalPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
