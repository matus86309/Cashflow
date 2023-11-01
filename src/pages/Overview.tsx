import {
  IonBackdrop,
  IonButtons,
  IonCard,
  IonCardContent,
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
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";

import { pencil } from "ionicons/icons";

import CustomCardHeader from "../components/CustomCardHeader";
import DTRowButton from "../components/DTRowButton";
import FullLogsList from "../components/FullLogsList";
import OverviewChart1 from "../components/overview_charts/OverviewChart1";
import OverviewChart2 from "../components/overview_charts/OverviewChart2";
import OverviewChart3 from "../components/overview_charts/OverviewChart3";
import LogOverview from "../components/overviews/LogOverview";
import InvalidPeriodPanel from "../components/space_fillers/InvalidPeriodPanel";
import Gray from "../components/text_styles/Gray";

const Overview: React.FC = () => {
  const [showDT, setShowDT] = useState(false);

  const today = new Date().toISOString().slice(0, 10);
  const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1, 1))
    .toISOString()
    .slice(0, 10);

  const [dateTo, setDateTo] = useState(today);
  const [dateFrom, setDateFrom] = useState(lastMonth);

  const periodLength =
    (+dateTo.slice(0, 4) - +dateFrom.slice(0, 4)) * 12 +
    +dateTo.slice(5, 7) -
    +dateFrom.slice(5, 7) +
    1;

  const [chartType, setChartType] = useState("1");
  const [viewedLog, setViewedLog] = useState<Log | undefined>(undefined);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Overview</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard>
                <CustomCardHeader>
                  <div className="header-text">
                    <Gray>Longterm</Gray>
                  </div>
                  <div className="header-select-wrapper">
                    <IonSelect
                      value={chartType}
                      onIonChange={(e) => setChartType(e.detail.value!)}
                      className="header-select"
                    >
                      <IonSelectOption value="1">balance</IonSelectOption>
                      <IonSelectOption value="2">
                        total income and expenses
                      </IonSelectOption>
                      <IonSelectOption value="3">
                        income, expenses and mixed
                      </IonSelectOption>
                    </IonSelect>
                  </div>
                  <div className="header-text">
                    <Gray>overview</Gray>
                  </div>
                </CustomCardHeader>

                <IonRow>
                  <IonCol className="panel-m">
                    <IonCardContent>
                      {chartType === "1" ? (
                        <OverviewChart1 />
                      ) : chartType === "2" ? (
                        <OverviewChart2 />
                      ) : (
                        <OverviewChart3 />
                      )}
                    </IonCardContent>
                  </IonCol>
                </IonRow>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>
                <CustomCardHeader>
                  <Gray>All logs</Gray>
                  <DTRowButton
                    onClick={() => setShowDT(!showDT)}
                    isOpen={showDT}
                  />
                </CustomCardHeader>
                <IonCardContent>
                  {showDT && (
                    <IonRow>
                      <IonCol size="6" className="date">
                        From:
                        <IonDatetimeButton datetime="of"></IonDatetimeButton>
                        <IonModal keepContentsMounted>
                          <IonDatetime
                            id="of"
                            presentation="date"
                            value={dateFrom}
                            onIonChange={(e) =>
                              setDateFrom(`${e.detail.value!.slice(0, 10)}`)
                            }
                          ></IonDatetime>
                        </IonModal>
                      </IonCol>
                      <IonCol size="6" className="date">
                        To:
                        <IonDatetimeButton datetime="ot"></IonDatetimeButton>
                        <IonModal keepContentsMounted>
                          <IonDatetime
                            id="ot"
                            presentation="date"
                            value={dateTo}
                            onIonChange={(e) =>
                              setDateTo(`${e.detail.value!.slice(0, 10)}`)
                            }
                          ></IonDatetime>
                        </IonModal>
                      </IonCol>
                    </IonRow>
                  )}
                  <IonRow>
                    <IonCol className="panel-l scrollable">
                      {periodLength > 25 || dateFrom > dateTo ? (
                        <InvalidPeriodPanel type="logs" />
                      ) : (
                        <FullLogsList
                          period={{ dateFrom: dateFrom, dateTo: dateTo }}
                          setViewedLog={setViewedLog}
                        />
                      )}
                    </IonCol>
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      {viewedLog === undefined ? (
        <IonFab slot="fixed" horizontal="end" vertical="bottom">
          <IonFabButton
            color="secondary"
            routerDirection="forward"
            routerLink="/Add-log"
          >
            <IonIcon src={pencil} />
          </IonFabButton>
        </IonFab>
      ) : (
        <>
          <IonBackdrop />
          <LogOverview log={viewedLog} close={() => setViewedLog(undefined)} />
        </>
      )}
    </IonPage>
  );
};

export default Overview;
