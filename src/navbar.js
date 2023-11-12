import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const { Link } = Nav;
const { Toggle, Collapse } = Navbar;
const { Item: NavItem } = NavDropdown;

const routeList = [
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
  {
    title: "Todo",
    url: "/TodoApp",
  },
  {
    title: "Color Picker",
    url: "/ColorApp",
  },
  {
    title: "SG Covid Tracker",
    url: "/Covid",
  },
];

export default function NavBS({ homePg, setHomePg }) {
  const [trans, setTrans] = useState("");

  return (
    <Navbar
      collapseOnSelect
      expand="md"
      fixed={homePg ? "top" : false}
      bg={homePg ? trans : "dark"}
      variant="dark"
      onToggle={(opened) => {
        if (homePg) {
          setTrans(opened ? "dark" : "");
        }
      }}
    >
      <Container>
        <Toggle aria-controls="basic-navbar-nav" />
        <Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {routeList.map(({ title, url }) => (
              <Link as={NavLink} key={title} eventKey={title} to={url} exact>
                {title}
              </Link>
            ))}
            <NavDropdown title="JS Frameworks" id="basic-nav-dropdown">
              <NavItem
                target="_blank"
                href="https://comcalc.neocities.org/vue/#/"
              >
                Vue
              </NavItem>
              <NavItem
                target="_blank"
                href="http://aspiring-argument.surge.sh/"
              >
                Gatsby
              </NavItem>
            </NavDropdown>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
