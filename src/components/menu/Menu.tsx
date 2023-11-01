import "./Menu.css";

import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";
import { useLocation } from "react-router-dom";

import {
  barChartOutline,
  bookOutline,
  cash,
  home,
  settings,
  shuffle,
  trendingDown,
  trendingUp,
} from "ionicons/icons";

interface AppPage {
  title: string;
  url: string;
  icon: string;
}

const MenuButtons: AppPage[] = [
  {
    title: "Home",
    url: "/Home",
    icon: home,
  },
  {
    title: "Overview",
    url: "/Overview",
    icon: barChartOutline,
  },
  {
    title: "Income",
    url: "/Income",
    icon: trendingUp,
  },
  {
    title: "Expenses",
    url: "/Expenses",
    icon: trendingDown,
  },
  {
    title: "Mixed",
    url: "/Mixed",
    icon: shuffle,
  },
  {
    title: "Lent & borrowed",
    url: "/LnB",
    icon: bookOutline,
  },
  {
    title: "Settings",
    url: "/Settings",
    icon: settings,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>
            <IonIcon src={cash} />
            <span style={{ paddingLeft: ".3em" }}>CashFlow</span>
          </IonListHeader>
          <IonNote>Manage your money</IonNote>
          {MenuButtons.map((Page, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname.startsWith(Page.url) ? "selected" : ""
                  }
                  routerLink={Page.url}
                  routerDirection="forward"
                  lines="none"
                  detail={false}
                >
                  <IonIcon aria-hidden="true" slot="start" src={Page.icon} />
                  <IonLabel>{Page.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
