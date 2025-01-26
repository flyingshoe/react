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
import { defaultGroceryList } from "./constant";
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
      return JSON.parse(localStorage[lsKey]).savedList ?? [];
    }
    return [];
  });
  const [groceryList, setGroceryList] = useState(() => {
    if (lsKey in localStorage) {
      return JSON.parse(localStorage[lsKey]).list ?? defaultGroceryList;
    }
    return defaultGroceryList;
  });

  useEffect(() => {
    localStorage.setItem(
      lsKey,
      JSON.stringify({ list: groceryList, savedList })
    );
  }, [groceryList, savedList]);

  const addToSavedList = (name) => {
    setSavedList((list) => [
      ...list,
      {
        id: Date.now().toString(),
        name,
        items: groceryList.filter(({ added }) => added).map(({ id }) => id),
      },
    ]);
  };

  const applySavedList = (id) => {
    const mySavedList = savedList.find((item) => item.id === id);
    const newGroceryList = groceryList.map((item) => ({
      ...item,
      added: item.added === true || mySavedList.items.includes(item.id),
    }));

    setGroceryList(newGroceryList);
  };

  const deleteSavedList = (id) => {
    setSavedList((list) => list.filter((item) => item.id !== id));
  };

  const handleDoneCheck = (e, val) => {
    const idx = groceryList.findIndex(({ id }) => id === e.target.name);
    let tempList = [...groceryList];

    // Set the checked value
    tempList[idx].done = val;

    // Save it
    setGroceryList(tempList);
  };

  const handleAddedCheck = (id) => {
    const idx = groceryList.findIndex((i) => i.id === id);
    let tempList = [...groceryList];

    // Invert the checked value
    tempList[idx].added = !tempList[idx].added;

    // Save it
    setGroceryList(tempList);
  };

  const handleDelete = (id) => {
    const idx = groceryList.findIndex((i) => i.id === id);
    let tempList = [...groceryList];
    tempList.splice(idx, 1);

    // Save it
    setGroceryList(tempList);
  };

  const handleAdd = (title) => {
    if (title.trim() !== "") {
      // Prepend to start if it doesn't exist
      if (groceryList.findIndex((i) => i.title === title) === -1) {
        setGroceryList([
          { id: Date.now().toString(), title, done: false, added: true },
          ...groceryList,
        ]);
      }
    }
  };

  const handleReset = () => {
    setGroceryList((list) =>
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
    setGroceryList((list) => list.map((item) => ({ ...item, done: false })));
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }} className="h-full">
      {/* No items in cart */}
      {groceryList.every(({ added }) => !added) && (
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
      {groceryList.filter(({ added, done }) => added === true && done !== true)
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
              {groceryList
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
      {groceryList.filter(({ added, done }) => added === true && done === true)
        .length > 0 && (
        <>
          <div className="flex justify-between items-center mb-4">
            <Typography
              variant="h3"
              sx={{ color: green[600] }}
              className="w-min"
            >
              {groceryList.filter(
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
              {groceryList
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
        groceryList={groceryList}
        handleDelete={handleDelete}
        handleAdd={handleAdd}
        handleCheck={handleAddedCheck}
        handleReset={handleReset}
        addToSavedList={addToSavedList}
        savedList={savedList}
        applySavedList={applySavedList}
        deleteSavedList={deleteSavedList}
      />
    </Container>
  );
}
