import { IconButton } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NothingSelectedView } from "../views/NothingSelectedView";
import { AddOutlined } from "@mui/icons-material";
import { useAppSelector } from "../../store/hooks/useAppSelector.hook";
import { NoteView } from "../views";
import { useAppDispatch } from "../../store";
import { noteStartAsync } from "../../store/journal/journal.thunks";
import { ActiveNote } from "../components/ActiveNote";

export const JournalPage = () => {
  const { isSaving, activeNote } = useAppSelector((state) => state.journal);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(noteStartAsync());
  };

  return (
    <JournalLayout>
      <ActiveNote />
      <IconButton
        onClick={handleClick}
        disabled={isSaving}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
