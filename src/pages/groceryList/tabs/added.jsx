import { RestartAlt, Add } from "@mui/icons-material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Button, Checkbox, Stack, Snackbar, Alert } from "@mui/material";
import { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
export default function AddedTab({
  groceryList,
  handleCheck,
  handleReset,
  addToSavedList,
}) {
  const [open, setOpen] = useState(false);
  const [snackbarOpened, setSnackbarOpened] = useState(false);
  const inputRef = useRef(null);

  const showSaveListDialog = () => {
    setOpen(true);
  };

  const hideSaveListDialog = () => {
    setOpen(false);
  };

  const SaveListDialog = () => {
    return (
      <Dialog open={open} onClose={hideSaveListDialog} fullWidth>
        <DialogTitle>Adding to Favourites</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="New List Name"
            fullWidth
            variant="standard"
            inputRef={inputRef}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={hideSaveListDialog}>Cancel</Button>
          <Button
            onClick={() => {
              addToSavedList(inputRef.current.value);
              setSnackbarOpened(true);
              hideSaveListDialog();
            }}
            variant="contained"
            color="success"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        className={`pt-4 sticky bg-white z-10`}
        sx={{ top: 48 }}
      >
        <Button
          startIcon={<RestartAlt />}
          variant="contained"
          fullWidth
          onClick={handleReset}
          className="mb-2"
          color="error"
        >
          Clear
        </Button>
        <Button
          startIcon={<Add />}
          variant="contained"
          fullWidth
          onClick={showSaveListDialog}
          className="mb-2"
          color="success"
        >
          Save
        </Button>
      </Stack>
      <List sx={{ pt: 0 }}>
        {groceryList
          .filter(({ added }) => added === true)
          .sort((a, b) => a.title.localeCompare(b.title))
          .map(({ id, title }) => (
            <ListItem disableGutters key={id} className="p-0">
              <ListItemButton className="p-0" onClick={() => handleCheck(id)}>
                <ListItemAvatar>
                  <Checkbox size="large" sx={{ pl: 0 }} checked={true} />
                </ListItemAvatar>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>

      <SaveListDialog />
      <Snackbar
        open={snackbarOpened}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpened(false)}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Saved to favourites!
        </Alert>
      </Snackbar>
    </>
  );
}
