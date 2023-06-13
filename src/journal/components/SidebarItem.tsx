import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Note } from "../models/note.model";
import { useNavigate } from "react-router-dom";

export const SidebarItem = ({ note }: { note: Note }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/notes/${note.id}`);
  };

  const title =
    note.title.length > 17 ? note.title.slice(0, 14) + "..." : note.title;
  const body =
    note.body.length > 45 ? note.body.slice(0, 42) + "..." : note.body;

  return (
    <>
      <ListItem disablePadding onClick={handleClick}>
        <ListItemButton>
          <ListItemIcon>
            <TurnedInNot />
          </ListItemIcon>
          <Grid container>
            <ListItemText primary={title} />
            <ListItemText secondary={body} />
          </Grid>
        </ListItemButton>
      </ListItem>
    </>
  );
};
