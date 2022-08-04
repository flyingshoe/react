import { useState, lazy, Suspense } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./navbar";
import LinearProgress from "@mui/material/LinearProgress";

const Home = lazy(() => import("./pages/home"));
const ColorApp = lazy(() => import("./pages/colorPicker"));
const TodoApp = lazy(() => import("./pages/todo"));
const Covid = lazy(() => import("./pages/covid"));
const Curl = lazy(() => import("./pages/curl"));

export default function Routes() {
  const [fixed, setFixed] = useState("");
  const [trans, setTrans] = useState("dark");

  return (
    <Router>
      <Nav fixed={fixed} trans={trans} />
      <Suspense fallback={<LinearProgress />}>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Home
                setNav={(val) => setFixed(val)}
                setTrans={(val) => setTrans(val)}
              />
            )}
          />
          <Route path="/TodoApp" component={TodoApp} />
          <Route path="/ColorApp" component={ColorApp} />
          <Route path="/Covid" component={Covid} />
          <Route path="/Curl" component={Curl} />
        </Switch>
      </Suspense>
    </Router>
  );
}
