import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { green, red } from "@mui/material/colors";
import { Checkbox, IconButton, Stack, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { CloseOutlined } from "@mui/icons-material";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

export default function AllTab({
  groceryList,
  handleCheck,
  handleDelete,
  handleAdd,
}) {
  const filterInputRef = useRef(null);
  const [filterVal, setFilterVal] = useState("");

  const handleAddAndClear = (value) => {
    handleAdd(value);
    filterInputRef.current.value = "";
    setFilterVal("");
  };

  const filteredGroceryList = groceryList.filter(({ title }) =>
    title.toLowerCase().includes(filterVal.trim().toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-row items-center justify-between pt-4 sticky top-12 bg-white z-10">
        <TextField
          inputRef={filterInputRef}
          label="Item name"
          onChange={(e) => setFilterVal(e.target.value)}
          InputProps={{
            autoComplete: "off",
            endAdornment: (
              <IconButton
                disableRipple
                onClick={() => {
                  filterInputRef.current.value = "";
                  setFilterVal("");
                }}
                sx={{ color: red[600] }}
                size="small"
              >
                <CloseOutlined />
              </IconButton>
            ),
          }}
          sx={{ flexGrow: 1 }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddAndClear(e.target.value);
            }
          }}
        />
        <IconButton
          disableRipple
          onClick={() => {
            handleAddAndClear(filterInputRef.current.value);
          }}
          sx={{ bgcolor: green[100], color: green[600], ml: 1 }}
        >
          <AddIcon />
        </IconButton>
      </div>

      <div className="flex-1">
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              height={height} // Adjust height as needed
              width={width}
              itemCount={filteredGroceryList.length}
              itemSize={53} // Adjust item size as needed
            >
              {({ index, style }) => {
                const { id, title, added } = filteredGroceryList.sort((a, b) =>
                  a.title.localeCompare(b.title)
                )[index];
                return (
                  <ListItem
                    style={style}
                    disableGutters
                    key={id}
                    className="p-0"
                  >
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
                );
              }}
            </FixedSizeList>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}
