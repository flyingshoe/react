import {
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import GroceryDialog from "./dialog";
import { groceryList } from "./constant";
import { blue, green, orange, purple } from "@mui/material/colors";

const lsKey = "groceryList";

export default function GroceryList() {
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

    // Reorder it, but first make a copy and remove it
    // const tempItem = { ...tempList[idx] };
    // tempList = tempList.filter(({ id }) => id !== tempItem.id);

    // // if checked, move it to the bottom of the list
    // if (val === true) {
    //   tempList = [...tempList, tempItem];
    // }

    // // If unchecked move it to the top of the list
    // else {
    //   tempList = [tempItem, ...tempList];
    // }

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
    // Prepend to start
    setSavedList([
      { id: Date.now().toString(), title, done: false, added: false },
      ...savedList,
    ]);
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

  return (
    <Container maxWidth="md" sx={{ pt: 5 }}>
      {savedList.filter(({ added, done }) => added === true && done !== true)
        .length > 0 && (
        <>
          <Typography variant="h3" sx={{ mb: 3, color: purple[700] }}>
            Grocery List
          </Typography>
          <Stack direction="column" spacing={2}>
            <FormGroup>
              {savedList
                .filter(({ added, done }) => added === true && done !== true)
                .map((item) => (
                  <ItemLine item={item} key={item.id} />
                ))}
            </FormGroup>
          </Stack>
        </>
      )}

      {savedList.filter(({ added, done }) => added === true && done === true)
        .length > 0 && (
        <>
          <Typography variant="h3" sx={{ my: 3, color: green[600] }}>
            Done
          </Typography>
          <Stack direction="column" spacing={2}>
            <FormGroup>
              {savedList
                .filter(({ added, done }) => added === true && done === true)
                .map((item) => (
                  <ItemLine item={item} key={item.id} />
                ))}
            </FormGroup>
          </Stack>
        </>
      )}

      <GroceryDialog
        savedList={savedList}
        handleDelete={handleDelete}
        handleAdd={handleAdd}
        handleCheck={handleAddedCheck}
      />
    </Container>
  );
}
