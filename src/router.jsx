import { useState, lazy, Suspense, useEffect } from "react";
import { HashRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import Nav from "./navbar";
import LinearProgress from "@mui/material/LinearProgress";

const Home = lazy(() => import("src/pages/home"));
const ColorApp = lazy(() => import("src/pages/colorPicker"));
const TodoApp = lazy(() => import("src/pages/todo"));
// const Covid = lazy(() => import("src/pages/covid"));
const Curl = lazy(() => import("src/pages/curl"));
const WordHack = lazy(() => import("src/pages/wordHack"));
const ImageUrl = lazy(() => import("src/pages/imageUrl"));
const WhatsApp = lazy(() => import("src/pages/whatsapp"));
const GroceryList = lazy(() => import("src/pages/groceryList"));
const NRIC = lazy(() => import("src/pages/nric/page"));
const StockApp = lazy(() => import("src/pages/stockApp"));
const ReactFlow = lazy(() => import("src/pages/reactFlow"));

const RouterContainer = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = pathname === "/" ? "React App" : pathname.split('/')[1].replace(/([A-Z])/g, " $1")
  }, [pathname])
  return <div className="flex-1">
    {children}
  </div>
}
export default function Routes() {
  const [homePg, setHomePg] = useState(false);
  const [showNav, setShowNav] = useState(true);
  return (
    <Router>
      <div className="flex flex-col min-h-screen h-full">
        {showNav && <Nav homePg={homePg} setHomePg={setHomePg} />}
        <Suspense fallback={<LinearProgress />}>
          <RouterContainer>
            <Switch>
              <Route path="/" exact>
                <Home setHomePg={setHomePg} />
              </Route>
              <Route path="/TodoApp" component={TodoApp} />
              <Route path="/ColorApp" component={ColorApp} />
              {/* <Route path="/Covid" component={Covid} /> */}
              <Route path="/Curl" component={Curl} />
              <Route path="/WordHack" component={WordHack} />
              <Route path="/ImageUrl" component={ImageUrl} />
              <Route path="/Whatsapp" component={WhatsApp} />
              <Route path="/GroceryList" component={GroceryList} />
              <Route path="/NRIC" ><NRIC setShowNav={setShowNav} /></Route>
              <Route path="/StockApp" component={StockApp} />
              <Route path="/ReactFlow" component={ReactFlow} />
            </Switch>
          </RouterContainer>
        </Suspense>
      </div>
    </Router>
  );
}
