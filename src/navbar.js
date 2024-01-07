import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";

import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";

const drawerWidth = 240;
const navItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Grocery List",
    url: "/GroceryList",
  },
  {
    title: "Whatsapp",
    url: "/Whatsapp",
  },
  {
    title: "Word Hack",
    url: "/WordHack",
  },
  {
    title: "Image URL Generator",
    url: "/ImageUrl",
  },
  // {
  //   title: "Todo",
  //   url: "/TodoApp",
  // },
  {
    title: "Color Picker",
    url: "/ColorApp",
  },
  // {
  //   title: "SG Covid Tracker",
  //   url: "/Covid",
  // },
  {
    title: "NRIC",
    url: "/NRIC",
  },
];


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const router = useLocation();

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    typeof window !== "undefined" ? window.document.body : undefined;

  return (
    <AppBar
      position={(router.pathname === "/" || router.pathname === '/ColorApp') ? "fixed" : "sticky"}
      style={{
        backgroundColor: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(5px) saturate(2)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* For Mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer}
            // sx={{ color: "common.white" }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={toggleDrawer}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              <Box onClick={toggleDrawer} sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    py: 2,
                    color: "#555",
                  }}
                  component={Link}
                  to="/"
                  className={router.pathname === "/" ? "m-nav-item-active" : ""}
                >
                  <HomeIcon />
                </Typography>
                <Divider />
                <List>
                  {navItems.map((item) => (
                    <ListItem
                      key={item.title}
                      component={Link}
                      to={item.url}
                      disablePadding
                      className={
                        router.pathname === item.url
                          ? "m-nav-item-active"
                          : "m-nav-item"
                      }
                    >
                      <ListItemButton
                        sx={{ textAlign: "center", color: "#555" }}
                      >
                        <ListItemText primary={item.title} to={item.url} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", sm: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#555",
              textDecoration: "none",
            }}
          >
            react
          </Typography>

          {/* For Desktop */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", sm: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#555",
              textDecoration: "none",
            }}
          >
            react
          </Typography>

          {/* Middle Items */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            {navItems.map((item) => (
              <Button
                key={item.title}
                component={Link}
                to={item.url}
                sx={{ my: 2, color: "#555", display: "block" }}
                className={
                  router.pathname === item.url ? "nav-item-active" : "nav-item"
                }
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
