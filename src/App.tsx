import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import "./App.css";

import { DataProvider } from "./context/DataContext";
import Home from "./pages/Home";
import Menu from "./components/menu/Menu";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses"
import Mixed from "./pages/Mixed";
import AddLog from "./pages/AddLog";
import CategoryOverview from "./pages/CategoryOverview";
import AddCategory from "./pages/AddCategory";
import LnB from "./pages/LnB";
import AddDebt from "./pages/AddDebt";
import EditCategory from "./pages/EditCategory";
import Overview from "./pages/Overview";
import EditLog from "./pages/EditLog";
import EditDebt from "./pages/EditDebt";
import Settings from "./pages/Settings";
import RegularIncome from "./pages/RegularIncome";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <DataProvider>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main" >
              <Route path="/" exact>
                <Redirect to="Home" />
              </Route>
              <Route path="/Home" exact>
                <Home />
              </Route>
              <Route path="/Income" exact>
                <Income />
              </Route>
              <Route path="/Expenses" exact>
                <Expenses />
              </Route>
              <Route path="/Mixed" exact>
                <Mixed />
              </Route>
              <Route path="/Add-log" exact>
                <AddLog />
              </Route>
              <Route path="/LnB" exact>
                <LnB />
              </Route>
              <Route path="/Add-debt" exact>
                <AddDebt />
              </Route>
              <Route path="/:ltype/Regular-income">
                <RegularIncome />
              </Route>
              <Route path="/Overview" exact>
                <Overview />
              </Route>
              <Route path="/Settings">
                <Settings />
              </Route>
              <Route path="/:lType/Add-category" exact>
                <AddCategory />
              </Route>
              <Route path="/:lType/Category/:name" exact>
                <CategoryOverview />
              </Route>
              <Route path="/Edit-log" exact>
                <EditLog />
              </Route>
              <Route path="/Edit-debt" exact>
                <EditDebt />
              </Route>
              <Route path="/Edit-category" exact>
                <EditCategory />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </DataProvider>
    </IonApp>
  );
};

export default App;
