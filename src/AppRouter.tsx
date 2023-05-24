import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "./auth/router/AuthRoutes";
import { JournalRoutes } from "./journal/router/JournalRoutes";
import { useAuth } from "./hooks/useAuth";
import { CheckingAuth } from "./ui";

export const AppRouter = () => {
  const { checking, loggedIn } = useAuth();
  if (checking) {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {loggedIn ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
      <Route />
    </Routes>
  );
};
