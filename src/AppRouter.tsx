import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "./auth/router/AuthRoutes";
import { JournalRoutes } from "./journal/router/JournalRoutes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/*" element={<JournalRoutes />} />
      <Route />
    </Routes>
  );
};
