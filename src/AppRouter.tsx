import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./auth/hooks/useAuth";
import { CheckingAuth } from "./common/ui";
import { Suspense, lazy } from "react";
import { injectAsyncReducer } from "./common/store/inject-async.reducer";
import store from "./common/store/store";
// import AuthRoutes from "./auth/router/AuthRoutes";

const LazyJournal = lazy(() => {
  import("./journal").then((module) => {
    injectAsyncReducer(store, "journal", module.reducer);
  });
  return import("./journal/router/JournalRoutes");
});

const LazyAuth = lazy(() => {
  import("./auth").then((module) => {
    injectAsyncReducer(store, "auth", module.reducer);
  });
  return import("./auth/router/AuthRoutes");
});

export const AppRouter = () => {
  const { checking, loggedIn } = useAuth();
  if (checking) {
    return <CheckingAuth />;
  }

  console.log({ store });

  return (
    <Routes>
      {loggedIn ? (
        <Route
          path="/*"
          element={
            <Suspense fallback={"...loading"}>
              <LazyJournal />
            </Suspense>
          }
        />
      ) : (
        <Route
          path="/auth/*"
          element={
            <Suspense fallback={"...loading"}>
              <LazyAuth />
            </Suspense>
          }
        />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
      <Route />
    </Routes>
  );
};
