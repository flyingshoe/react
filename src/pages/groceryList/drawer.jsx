import { Star } from "@mui/icons-material";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import {
  Container,
  Fab,
  Stack,
  SwipeableDrawer,
  Tab,
  Tabs,
} from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useRef } from "react";
import AddedTab from "src/pages/groceryList/tabs/added";
import AllTab from "src/pages/groceryList/tabs/all";
import SavedListTab from "src/pages/groceryList/tabs/savedList";

export default forwardRef(function GroceryDrawer(
  {
    groceryList,
    handleDelete,
    handleAdd,
    handleCheck,
    handleReset,
    addToSavedList,
    savedList,
    applySavedList,
    deleteSavedList,
  },
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
      setTabSel("all");
    },
  }));

  return (
    <div>
      <Fab
        color="secondary"
        aria-label="edit"
        className="fixed right-8 bottom-8"
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
        {/* Add new Item */}
        <Stack>
          <Tabs
            value={tabSel}
            onChange={(_, val) => {
              setTabSel(val);
            }}
            variant="fullWidth"
            aria-label="grocery tabs"
            className="sticky top-0 bg-white z-20 px-4"
          >
            <Tab label="My Cart" value="added" />
            <Tab label="Favourites" value="savedList" />
            <Tab label="All" value="all" />
          </Tabs>
          <Container>
            {tabSel == "added" && (
              <AddedTab
                groceryList={groceryList}
                handleCheck={handleCheck}
                handleReset={handleReset}
                addToSavedList={addToSavedList}
              />
            )}

            {tabSel == "all" && (
              <AllTab
                groceryList={groceryList}
                handleCheck={handleCheck}
                inputRef={inputRef}
                handleDelete={handleDelete}
                handleAdd={handleAdd}
              />
            )}

            {tabSel == "savedList" && (
              <SavedListTab
                groceryList={groceryList}
                handleCheck={handleCheck}
                inputRef={inputRef}
                handleDelete={handleDelete}
                handleAdd={handleAdd}
                savedList={savedList}
                applySavedList={applySavedList}
                deleteSavedList={deleteSavedList}
              />
            )}
          </Container>
        </Stack>
      </SwipeableDrawer>
    </div>
  );
});
