import { IconButton } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { AddOutlined } from "@mui/icons-material";
import { useAppSelector } from "../../store/hooks/useAppSelector.hook";
import { NotesRoutes } from "../router/NotesRoutes";
import { useNavigate } from "react-router-dom";

export const JournalPage = () => {
  const { isSaving } = useAppSelector((state) => state.journal);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/notes/create");
  };

  return (
    <JournalLayout>
      <NotesRoutes />
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
