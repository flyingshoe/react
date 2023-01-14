import { Button } from "@mui/material";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import MyComp from "./comp";
import MyComp2 from "./comp2";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Router>
    <Route path="/" exact>
      <MyComp />
    </Route>

    <Route path="/asd">
      <MyComp2 />
    </Route>
  </Router>
);
