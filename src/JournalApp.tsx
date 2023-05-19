import { AppRouter } from "./AppRouter";
import { AppTheme } from "./theme/AppTheme";

export const JournalApp = () => {
  return (
    <>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </>
  );
};
