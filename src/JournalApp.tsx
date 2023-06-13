import { AppRouter } from "./AppRouter";
import { AppTheme } from "./common/theme/AppTheme";

export const JournalApp = () => {
  return (
    <>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </>
  );
};
