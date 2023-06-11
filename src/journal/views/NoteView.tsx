import { DeleteOutlined, SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";
import { Note } from "../../store/models/note.model";
import { getCurrentDate } from "../../common/utils/date.utils";
import { useForm } from "../../hooks";
import { useAppDispatch } from "../../store";
import {
  createNoteAsync,
  deleteNoteAsync,
  editNoteAsync,
} from "../../store/journal/journal.thunks";
import { useActiveNote } from "../../hooks/useActiveNote";
import { ConfirmationDialog } from "../../common/utils/components/ConfirmationDialog";
import { useNavigate } from "react-router-dom";

export const NoteView = () => {
  const { activeNote, newNote } = useActiveNote();
  const { title, body, date, onInputChange, isFormValid, formState } =
    useForm<Note>(activeNote);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSaveClick = () => {
    if (!isFormValid) return;
    dispatch(editNoteAsync(formState));
  };

  const handleNewNote = () => {
    if (!isFormValid) return;
    dispatch(createNoteAsync(formState));
    navigate("notes");
  };

  const handleDeleteNote = () => {
    dispatch(deleteNoteAsync(activeNote.id));
    navigate("notes");
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {getCurrentDate(new Date(date), {
            weekday: "short",
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color="primary"
          sx={{ padding: 2 }}
          onClick={newNote ? handleNewNote : handleSaveClick}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
        {!newNote && (
          <ConfirmationDialog
            color="error"
            confirm={handleDeleteNote}
            displayText="Are you Sure you want to Delete the Note ? "
            children={
              <>
                <DeleteOutlined sx={{ fontSize: 30, mr: 1 }} />
                Delete
              </>
            }
          />
        )}
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <ImageGallery />
    </Grid>
  );
};
