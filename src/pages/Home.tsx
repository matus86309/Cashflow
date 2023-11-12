import {
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useContext, useState } from "react";

import { pencil } from "ionicons/icons";

import CustomCardHeader from "../components/CustomCardHeader";
import HomeBarChart from "../components/charts/HomeBarChart";
import HomePieChartPanel from "../components/HomePieChartPanel";
import Gray from "../components/text_styles/Gray";
import Data from "../context/DataContext";

import { fromLogType, getMonth, logTypes } from "../components/global";

const Home: React.FC = () => {
  const DBLogs = useContext(Data).DBLogs;
  const currencySymbol = useContext(Data).currencySymbol;
  const defaultLogType = useContext(Data).defaultLogType;

  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [overviewType, setOverviewType] = useState<LogType>(defaultLogType);

  const createDataPoint = (t: LogType, round: boolean = false) => {
    const balance = getMonth(DBLogs, month)
      [t].reduce((acc, l) => (acc += l.amount), 0)
      .toFixed(2);
    if (+balance !== 0)
      return {
        x: fromLogType(t),
        y: round ? Math.abs(+balance) : +balance,
        // the 2 spaces at the beginning create padding in the tooltip, DO NOT REMOVE
        label: `  ${t}: ${balance + currencySymbol}`,
        noData: false,
      };
    return {
      x: fromLogType(t),
      y: 0,
      label: t + ": No records",
      noData: true,
    };
  };

  const getData = () => {
    const createMixedGhost = () => {
      const balance = getMonth(DBLogs, month)
        ["mixed"].reduce((acc, l) => (acc += l.amount), 0)
        .toFixed(2);
      if (+balance !== 0)
        return {
          x: +balance > 0 ? "Income" : "Expenses",
          y: Math.abs(+balance),
          // the 2 spaces at the beginning create padding in the tooltip, DO NOT REMOVE
          label: "  mixed: " + balance + currencySymbol,
          noData: false,
        };
      return {
        x: "Mixed",
        y: 0,
        label: "",
        noData: true,
      };
    };
    return [
      ...logTypes.map((t) => createDataPoint(t, true)),
      createMixedGhost(),
    ];
  };

  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard>{/* <NewLineChart /> */}</IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>
                <CustomCardHeader>
                  <IonTitle className="header-text">
                    <Gray>Cashflow in</Gray>
                  </IonTitle>
                  <div className="header-select-wrapper">
                    <IonDatetimeButton
                      datetime="h1"
                      className="header-datetime"
                    />
                    <IonModal keepContentsMounted>
                      <IonDatetime
                        id="h1"
                        presentation="month-year"
                        value={month}
                        onIonChange={(e) =>
                          setMonth(`${e.detail.value!.slice(0, 7)}`)
                        }
                      ></IonDatetime>
                    </IonModal>
                  </div>
                </CustomCardHeader>
                <IonRow>
                  <IonCol className="panel-m">
                    <HomeBarChart data={getData()} />
                  </IonCol>
                </IonRow>
              </IonCard>
            </IonCol>
          </IonRow>
          <HomePieChartPanel overviewTypeState={[overviewType, setOverviewType]} month={month} />
        </IonGrid>
      </IonContent>

      <IonFab slot="fixed" horizontal="end" vertical="bottom">
        <IonFabButton
          color="secondary"
          routerDirection="forward"
          routerLink="/Add-log"
        >
          <IonIcon src={pencil} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default Home;
