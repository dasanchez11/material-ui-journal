import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Note } from "../../store/models/note.model";
import { useNavigate } from "react-router-dom";

export const SidebarItem = ({ note }: { note: Note }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/notes/${note.id}`);
  };

  return (
    <>
      <ListItem disablePadding onClick={handleClick}>
        <ListItemButton>
          <ListItemIcon>
            <TurnedInNot />
          </ListItemIcon>
          <Grid container>
            <ListItemText primary={note.title} />
            <ListItemText secondary={note.body} />
          </Grid>
        </ListItemButton>
      </ListItem>
    </>
  );
};
