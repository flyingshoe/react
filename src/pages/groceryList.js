import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const groceryList = [
  { id: "1", title: "veg", done: false },
  { id: "2", title: "tomato", done: true },
  { id: "3", title: "Pork", done: false },
];

export default function GroceryList() {
  const [list, setList] = useState(groceryList);
  const handleCheck = (e, val) => {
    const idx = list.findIndex(({ id }) => id === e.target.name);
    let tempList = [...list];

    // Set the checked value
    tempList[idx].done = val;

    // Reorder it, but first make a copy and remove it
    const tempItem = { ...tempList[idx] };
    tempList = tempList.filter(({ id }) => id !== tempItem.id);

    // if checked, move it to the bottom of the list
    if (val === true) {
      tempList = [...tempList, tempItem];
    }

    // If unchecked move it to the top of the list
    else {
      tempList = [tempItem, ...tempList];
    }

    // Save it
    setList(tempList);
  };

  const ItemLine = ({ item: { id, title, done } }) => {
    return (
      <>
        <FormControlLabel
          control={
            <Checkbox
              name={id}
              size="large"
              checked={done}
              onChange={handleCheck}
            />
          }
          label={
            <Typography
              variant="h5"
              sx={done && { textDecoration: "line-through" }}
            >
              {title}
            </Typography>
          }
        />
      </>
    );
  };

  return (
    <Container maxWidth="md" sx={{ pt: 5 }}>
      <Typography variant="h3">Grocery List</Typography>
      {/* <TextField label="New Item" variant="outlined" />
      <Button variant="contained">Add</Button> */}
      <Stack direction="column" spacing={2}>
        <FormGroup>
          {list.map((item) => (
            <ItemLine item={item} />
          ))}
        </FormGroup>
      </Stack>
    </Container>
  );
}
