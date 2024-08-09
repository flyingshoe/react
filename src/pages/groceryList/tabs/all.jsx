import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { green, red } from "@mui/material/colors";
import { Checkbox, IconButton, Stack, TextField } from "@mui/material";
export default function AllTab({
  groceryList,
  handleCheck,
  inputRef,
  handleDelete,
  handleAdd,
}) {
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className="mt-4 sticky top-0"
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
      <List sx={{ pt: 0 }}>
        {groceryList
          .sort((a, b) => a.title.localeCompare(b.title))
          .map(({ id, title, added }) => (
            <ListItem disableGutters key={id} className="p-0">
              <ListItemButton className="p-0" onClick={() => handleCheck(id)}>
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
    </>
  );
}
