import { RestartAlt, Add } from "@mui/icons-material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Button, Checkbox, Stack } from "@mui/material";
export default function AddedTab({ savedList, handleCheck, handleReset }) {
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
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
        <Button
          startIcon={<Add />}
          variant="contained"
          fullWidth
          // onClick={handleReset}
          className="mb-2"
          color="secondary"
        >
          Save List
        </Button>
      </Stack>
      <List sx={{ pt: 0 }}>
        {savedList
          .filter(({ added }) => added === true)
          .sort((a, b) => a.title.localeCompare(b.title))
          .map(({ id, title }) => (
            <ListItem disableGutters key={id} className="p-0">
              <ListItemButton className="p-0" onClick={() => handleCheck(id)}>
                <ListItemAvatar>
                  <Checkbox size="large" sx={{ pl: 0 }} checked={true} />
                </ListItemAvatar>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </>
  );
}
