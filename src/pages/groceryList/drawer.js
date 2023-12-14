import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { green, red } from "@mui/material/colors";
import {
  Checkbox,
  Container,
  Fab,
  Stack,
  SwipeableDrawer,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useRef } from "react";

export default function GroceryDrawer({
  savedList,
  handleDelete,
  handleAdd,
  handleCheck,
}) {
  const inputRef = useRef();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Fab
        color="secondary"
        aria-label="edit"
        sx={{ position: "fixed", bottom: 30, right: 30 }}
        onClick={handleClickOpen}
      >
        <EditIcon />
      </Fab>

      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={handleClose}
        onOpen={handleClickOpen}
      >
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              width: "100%",
              pt: 3,
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              zIndex: 1,
            }}
          >
            <TextField
              inputRef={inputRef}
              label="Add Item"
              sx={{ flexGrow: 1 }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAdd(e.target.value);
                  e.target.value = "";
                }
              }}
            />
            <Avatar
              sx={{ bgcolor: green[100], color: green[600], ml: 1 }}
              onClick={() => {
                handleAdd(inputRef.current.value);
                inputRef.current.value = "";
              }}
            >
              <AddIcon />
            </Avatar>
          </Stack>

          <List sx={{ pt: 0 }}>
            {savedList.map(({ id, title, added }) => (
              <ListItem disableGutters key={id}>
                <ListItemButton sx={{ px: 0 }} onClick={() => handleCheck(id)}>
                  <ListItemAvatar>
                    <Checkbox
                      size="large"
                      sx={{ pl: 0 }}
                      checked={added === true}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={title} />
                  <DeleteIcon
                    sx={{ color: red[600] }}
                    fontSize="large"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(id);
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Container>
      </SwipeableDrawer>
    </div>
  );
}
