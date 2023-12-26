import { useState, lazy, Suspense, useEffect } from "react";
import { HashRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import Nav from "./navbar";
import LinearProgress from "@mui/material/LinearProgress";

const Home = lazy(() => import("./pages/home"));
const ColorApp = lazy(() => import("./pages/colorPicker"));
const TodoApp = lazy(() => import("./pages/todo"));
const Covid = lazy(() => import("./pages/covid"));
const Curl = lazy(() => import("./pages/curl"));
const WordHack = lazy(() => import("./pages/wordHack"));
const ImageUrl = lazy(() => import("./pages/imageUrl"));
const WhatsApp = lazy(() => import("./pages/whatsapp"));
const GroceryList = lazy(() => import("./pages/groceryList"));

const RouterContainer = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = pathname === "/" ? "React App" : pathname.split('/')[1].replace(/([A-Z])/g, " $1")
  }, [pathname])
  return <>
    {children}
  </>
}
export default function Routes() {
  const [homePg, setHomePg] = useState(false);

  return (
    <Router>
      <Nav homePg={homePg} setHomePg={setHomePg} />
      <Suspense fallback={<LinearProgress />}>

        <RouterContainer>
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
          </Switch></RouterContainer>
      </Suspense>
    </Router>
  );
}
