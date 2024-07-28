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
import NotAddedTab from "src/pages/groceryList/tabs/notAdded";

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

            {tabSel == "added" && (
              <AddedTab
                savedList={savedList}
                handleCheck={handleCheck}
                handleReset={handleReset}
              />
            )}
            {tabSel == "notAdded" && (
              <NotAddedTab
                savedList={savedList}
                handleCheck={handleCheck}
                inputRef={inputRef}
                handleDelete={handleDelete}
                handleAdd={handleAdd}
              />
            )}
          </Stack>
        </Container>
      </SwipeableDrawer>
    </div>
  );
});
