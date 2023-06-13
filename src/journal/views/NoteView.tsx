import {
  DeleteOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";
import { Note } from "../models/note.model";
import { getCurrentDate } from "../../common/utils/date.utils";
import {
  createNoteAsync,
  deleteNoteAsync,
  editNoteAsync,
} from "../store/journal.thunks";
import { useActiveNote } from "../hooks/useActiveNote";
import { ConfirmationDialog } from "../../common/components/ConfirmationDialog";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useRef } from "react";
import { useAppDispatch, useForm } from "../../common";

export const NoteView = () => {
  const { activeNote, newNote } = useActiveNote();
  const { title, body, date, onInputChange, isFormValid, formState } =
    useForm<Note>(activeNote);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    if (files.length > 0) {
    }
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
        <input
          ref={inputRef}
          style={{ display: "none" }}
          type="file"
          multiple
          onChange={handleFileUpload}
        />
        <IconButton color="primary" onClick={() => inputRef.current?.click()}>
          <UploadOutlined />
        </IconButton>
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
