import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import { green, red } from "@mui/material/colors";
import { Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

export default function SavedListTab({
  savedList,
  applySavedList,
  deleteSavedList,
}) {
  const [snackbarOpened, setSnackbarOpened] = useState(false);
  const [dialogOpened, setDialogOpened] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  return (
    <div className="pt-4">
      {savedList.length == 0 && (
        <Typography variant="h5" className="text-center pt-5">
          No list saved yet
        </Typography>
      )}
      <List sx={{ pt: 0 }}>
        {savedList.map(({ id, name }) => (
          <ListItem key={id} disableGutters className="px-1 py-3">
            <ListItemAvatar>
              <Add
                sx={{ color: green[600] }}
                fontSize="large"
                onClick={(e) => {
                  e.stopPropagation();
                  applySavedList(id);
                  setSnackbarOpened(true);
                }}
              />
            </ListItemAvatar>
            <ListItemText primary={name} />
            <DeleteIcon
              sx={{ color: red[600] }}
              fontSize="large"
              onClick={(e) => {
                e.stopPropagation();
                setDialogOpened(true);
                setDeleteId(id);
              }}
            />
          </ListItem>
        ))}
      </List>

      <Snackbar
        open={snackbarOpened}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpened(false)}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Saved list applied!
        </Alert>
      </Snackbar>

      <Dialog
        open={dialogOpened}
        onClose={() => setDialogOpened(false)}
        fullWidth
      >
        <DialogTitle>
          <Alert severity="warning" variant="filled">
            Are you sure you want to delete the saved list?
          </Alert>
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              deleteSavedList(deleteId);
              setDialogOpened(false);
            }}
            color="error"
          >
            Yes
          </Button>
          <Button onClick={() => setDialogOpened(false)}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
