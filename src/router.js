import { useState, lazy, Suspense } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./navbar";
import LinearProgress from "@mui/material/LinearProgress";
import { ThemeProvider, createTheme } from "@mui/material";

const Home = lazy(() => import("./pages/home"));
const ColorApp = lazy(() => import("./pages/colorPicker"));
const TodoApp = lazy(() => import("./pages/todo"));
const Covid = lazy(() => import("./pages/covid"));
const Curl = lazy(() => import("./pages/curl"));
const WordHack = lazy(() => import("./pages/wordHack"));
const ImageUrl = lazy(() => import("./pages/imageUrl"));
const WhatsApp = lazy(() => import("./pages/whatsapp"));
const GroceryList = lazy(() => import("./pages/groceryList"));

export default function Routes() {
  const [homePg, setHomePg] = useState(false);
  const [darkMode, setDarkMode] = useState(false)

  const myTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : "light",
    },
  });


  return (
    <ThemeProvider theme={myTheme}>
      <Router>
        <Nav homePg={homePg} setHomePg={setHomePg} setDarkMode={setDarkMode} />
        <Suspense fallback={<LinearProgress />}>
          <Switch>
            <Route path="/" exact>
              <Home setHomePg={setHomePg} />
            </Route>
            <Route path="/TodoApp" component={TodoApp} />
            <Route path="/ColorApp" component={ColorApp} />
            <Route path="/Covid" component={Covid} />
            <Route path="/Curl" component={Curl} />
            <Route path="/WordHack" component={WordHack} />
            <Route path="/ImageUrl" component={ImageUrl} />
            <Route path="/Whatsapp" component={WhatsApp} />
            <Route path="/GroceryList" component={GroceryList} />
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}
