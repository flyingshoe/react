import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { green, red } from "@mui/material/colors";
import {
  Checkbox,
  DialogContent,
  Fab,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useRef } from "react";

export default function GroceryDialog({
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

      <Dialog onClose={handleClose} open={open} fullWidth>
        <DialogTitle component="div">
          <Typography variant="h4" sx={{ mb: 2 }}>
            Saved List
          </Typography>
          <ListItem disableGutters>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ width: "100%" }}
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
          </ListItem>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <List sx={{ pt: 0 }}>
            {savedList.map(({ id, title, added }) => (
              <ListItem disableGutters key={id}>
                <ListItemButton sx={{ px: 0 }} onClick={()=>handleCheck(id)}>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
