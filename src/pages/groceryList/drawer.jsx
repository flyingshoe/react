import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { green, red } from "@mui/material/colors";
import {
  Button,
  Checkbox,
  Container,
  Fab,
  IconButton,
  Stack,
  SwipeableDrawer,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useRef } from "react";
import { RestartAlt } from "@mui/icons-material";

export default forwardRef(function GroceryDrawer(
  { savedList, handleDelete, handleAdd, handleCheck, handleReset },
  ref
) {
  const inputRef = useRef();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [tabSel, setTabSel] = useState("added");

  useImperativeHandle(ref, () => ({
    showAddItems() {
      handleClickOpen();
      setTabSel("notAdded");
    },
  }));

  return (
    <div>
      <Fab
        color="secondary"
        aria-label="edit"
        sx={{ position: "fixed", bottom: 30, right: 30 }}
        onClick={handleClickOpen}
      >
        <LocalGroceryStoreIcon />
      </Fab>

      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={handleClose}
        onOpen={handleClickOpen}
        sx={{
          "& .MuiDrawer-paperAnchorRight": {
            width: {
              xs: "80%",
              sm: "70%",
              md: "50%",
              lg: "30%",
            },
          },
        }}
      >
        <Container>
          {/* Add new Item */}
          <Stack
            sx={{
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              zIndex: 1,
            }}
          >
            {/* Tabs - Added/Not Added */}
            <Tabs
              value={tabSel}
              onChange={(_, val) => {
                setTabSel(val);
              }}
              variant="fullWidth"
              aria-label="grocery tabs"
              sx={{
                mt: 1,
              }}
            >
              <Tab label="Added" value="added" />
              <Tab label="Not Added" value="notAdded" />
            </Tabs>

            {tabSel === "added" && (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  mt: 2,
                }}
              >
                <Button
                  startIcon={<RestartAlt />}
                  variant="contained"
                  fullWidth
                  onClick={handleReset}
                  className="mb-2"
                  color="error"
                >
                  Clear All
                </Button>
              </Stack>
            )}

            {tabSel === "notAdded" && (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  mt: 2,
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
                <IconButton
                  disableRipple
                  onClick={() => {
                    handleAdd(inputRef.current.value);
                    inputRef.current.value = "";
                  }}
                  sx={{ bgcolor: green[100], color: green[600], ml: 1 }}
                >
                  <AddIcon />
                </IconButton>
              </Stack>
            )}
          </Stack>

          <List sx={{ pt: 0 }}>
            {tabSel === "added" &&
              savedList
                .filter(({ added }) => added === true)
                .sort((a, b) => a.title.localeCompare(b.title))
                .map(({ id, title, added }) => (
                  <ListItem disableGutters key={id} className="p-0">
                    <ListItemButton
                      className="p-0"
                      onClick={() => handleCheck(id)}
                    >
                      <ListItemAvatar>
                        <Checkbox size="large" sx={{ pl: 0 }} checked={true} />
                      </ListItemAvatar>
                      <ListItemText primary={title} />
                    </ListItemButton>
                  </ListItem>
                ))}

            {tabSel === "notAdded" &&
              savedList
                .filter(({ added }) => added === false)
                .sort((a, b) => a.title.localeCompare(b.title))
                .map(({ id, title, added }) => (
                  <ListItem disableGutters key={id} className="p-0">
                    <ListItemButton
                      className="p-0"
                      onClick={() => handleCheck(id)}
                    >
                      <ListItemAvatar>
                        <Checkbox size="large" sx={{ pl: 0 }} checked={added} />
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
});
