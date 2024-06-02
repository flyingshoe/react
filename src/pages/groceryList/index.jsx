import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { groceryList } from "./constant";
import { green, purple } from "@mui/material/colors";
import GroceryDrawer from "./drawer";
import {
  Done,
  Payment,
  RestartAlt,
  ShoppingCartCheckout,
} from "@mui/icons-material";

const lsKey = "groceryList";

export default function GroceryList() {
  const drawerRef = useRef();
  const [savedList, setSavedList] = useState(() => {
    if (lsKey in localStorage) {
      return JSON.parse(localStorage[lsKey]);
    }
    return groceryList;
  });

  useEffect(() => {
    localStorage.setItem(lsKey, JSON.stringify(savedList));
  }, [savedList]);

  const handleDoneCheck = (e, val) => {
    const idx = savedList.findIndex(({ id }) => id === e.target.name);
    let tempList = [...savedList];

    // Set the checked value
    tempList[idx].done = val;

    // Save it
    setSavedList(tempList);
  };

  const handleAddedCheck = (id) => {
    const idx = savedList.findIndex((i) => i.id === id);
    let tempList = [...savedList];

    // Invert the checked value
    tempList[idx].added = !tempList[idx].added;

    // Save it
    setSavedList(tempList);
  };

  const handleDelete = (id) => {
    const idx = savedList.findIndex((i) => i.id === id);
    let tempList = [...savedList];
    tempList.splice(idx, 1);

    // Save it
    setSavedList(tempList);
  };

  const handleAdd = (title) => {
    if (title.trim() !== "") {
      // Prepend to start
      setSavedList([
        { id: Date.now().toString(), title, done: false, added: false },
        ...savedList,
      ]);
    }
  };

  const handleReset = () => {
    setSavedList((list) =>
      list.map((item) => ({ ...item, added: false, done: false }))
    );
  };

  const ItemLine = ({ item: { id, title, done } }) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            name={id}
            size="large"
            checked={done}
            onChange={handleDoneCheck}
          />
        }
        label={
          <Typography
            variant="h5"
            sx={done ? { textDecoration: "line-through" } : {}}
          >
            {title}
          </Typography>
        }
      />
    );
  };

  const unselectAll = () => {
    setSavedList((list) => list.map((item) => ({ ...item, done: false })));
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }} className="h-full">
      {/* No items in cart */}
      {savedList.every(({ added }) => !added) && (
        <div className="flex flex-col justify-center items-center space-y-4 h-full">
          <Typography variant="h4" sx={{ color: "primary.main" }}>
            No items in cart
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => drawerRef.current.showAddItems()}
          >
            Add Items
          </Button>
        </div>
      )}

      {/* Grocery List (Not yet done) */}
      {savedList.filter(({ added, done }) => added === true && done !== true)
        .length > 0 && (
        <>
          <Typography
            variant="h3"
            className="select-none"
            sx={{ mb: 3, color: purple[700] }}
            onClick={() =>
              navigator.clipboard.writeText(localStorage.getItem("groceryList"))
            }
          >
            Grocery List
          </Typography>
          <Stack direction="column" spacing={2} sx={{ mb: 4 }}>
            <FormGroup>
              {savedList
                .filter(({ added, done }) => added === true && done !== true)
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((item) => (
                  <ItemLine item={item} key={item.id} />
                ))}
            </FormGroup>
          </Stack>
        </>
      )}

      {/* Done List */}
      {savedList.filter(({ added, done }) => added === true && done === true)
        .length > 0 && (
        <>
          <div className="flex justify-between items-center mb-4">
            <Typography
              variant="h3"
              sx={{ color: green[600] }}
              className="w-min"
            >
              {savedList.filter(
                ({ added, done }) => added === true && done !== true
              ).length > 0 ? (
                "Done"
              ) : (
                <span>
                  Time to Checkout
                  <span className="whitespace-nowrap">
                    <Done fontSize="inherit" />
                    <ShoppingCartCheckout
                      fontSize="inherit"
                      color="secondary"
                    />
                    <Payment fontSize="inherit" color="primary" />
                  </span>
                </span>
              )}
            </Typography>
            <Button
              startIcon={<RestartAlt />}
              variant="contained"
              color="secondary"
              onClick={unselectAll}
              size="large"
            >
              Reset
            </Button>
          </div>

          <Stack direction="column" spacing={2}>
            <FormGroup>
              {savedList
                .filter(({ added, done }) => added === true && done === true)
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((item) => (
                  <ItemLine item={item} key={item.id} />
                ))}
            </FormGroup>
          </Stack>
        </>
      )}

      {/* Shopping list Floating Action Button */}
      <GroceryDrawer
        ref={drawerRef}
        savedList={savedList}
        handleDelete={handleDelete}
        handleAdd={handleAdd}
        handleCheck={handleAddedCheck}
        handleReset={handleReset}
      />
    </Container>
  );
}
