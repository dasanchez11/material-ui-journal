import { Navigate, Route, Routes } from "react-router-dom";
import { JournalPage } from "../pages/JournalPage";
import { useNotes } from "../hooks/useNotes";

const JournalRoutes = () => {
  useNotes();
  return (
    <Routes>
      <Route path="*" element={<JournalPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default JournalRoutes;
