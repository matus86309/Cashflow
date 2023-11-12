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
import { useContext, useState } from "react";

import { pencil } from "ionicons/icons";

import ActionFab from "../components/ActionFab";
import CategoriesList from "../components/CategoriesList";
import CustomCardHeader from "../components/CustomCardHeader";
import DTRowButton from "../components/DTRowButton";
import ShortLogsList from "../components/ShortLogsList";
import StackedBarChart from "../components/charts/StackedBarChart";
import LogOverview from "../components/overviews/LogOverview";
import AddLogButton from "../components/space_fillers/AddLogButton";
import InvalidPeriodPanel from "../components/space_fillers/InvalidPeriodPanel";
import Gray from "../components/text_styles/Gray";
import Data from "../context/DataContext";

import {
  getBalanceFromLogs,
  getLogsFromPeriod,
  getMonths,
  newDate,
} from "../components/global";

const Income: React.FC = () => {
  const DBLogs = useContext(Data).DBLogs;
  const categories = useContext(Data).categories;
  const currencySymbol = useContext(Data).currencySymbol;

  const [showDT, setShowDT] = useState(false);

  const today = new Date().toISOString().slice(0, 10);
  const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1, 1))
    .toISOString()
    .slice(0, 10);
  const [dateTo, setDateTo2] = useState(today);
  const [dateFrom, setDateFrom2] = useState(lastMonth);

  const periodLength =
    (+dateTo.slice(0, 4) - +dateFrom.slice(0, 4)) * 12 +
    +dateTo.slice(5, 7) -
    +dateFrom.slice(5, 7) +
    1;

  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [viewedLog, setViewedLog] = useState<Log | undefined>(undefined);
  const [chart, setChart] = useState<1 | 2>(1);

  const getChartData = () => {
    const months = getMonths(DBLogs, new Date().toISOString().slice(0, 10), 7);
    if (chart === 1) {
      // Income data
      return [
        months.map((m) => {
          if (m.income.length > 0) {
            const balance = m.income
              .reduce((acc, l) => acc + l.amount, 0)
              .toFixed(2);

            return {
              x: newDate(m.name),
              y: +balance,
              label: balance + currencySymbol,
              noData: false,
            };
          } else {
            return {
              x: newDate(m.name),
              y: 0,
              label: "",
              noData: true,
            };
          }
        }),
      ];
    } else {
      // Income by category data
      return [{ name: "Uncategorised" }, ...categories.income].map((cat) => {
        // layers
        return months.map((m) => {
          let y = 0;
          let noData = true;
          m.income.forEach((l) => {
            if (l.category.name === cat.name) {
              y += l.amount;
              noData = false;
            }
          });
          // datapoint
          return {
            x: newDate(m.name),
            y: +y.toFixed(2),
            label: `${cat.name}\n${y.toFixed(2) + currencySymbol}`,
            noData,
          };
        });
      });
    }
  };

  const getLogs = (): Log[] => {
    return getLogsFromPeriod(DBLogs, { dateFrom, dateTo }, "income");
  };

  const getCategories = () => {
    const logs = getLogs();
    if (categories.income.length > 0)
      return [{ name: "Uncategorised" }, ...categories.income].map((c) => {
        let balance = 0;
        balance += getBalanceFromLogs(logs, c.name);
        return { name: c.name, balance };
      });
    return [];
  };

  const catClick = (name: string) => {
    if (selectedCats.find((n) => n === name) === undefined) {
      setSelectedCats([...selectedCats, name]);
    } else {
      setSelectedCats([...selectedCats.filter((n) => n !== name)]);
    }
  };

  return (
    <IonPage>
      {viewedLog !== undefined && (
        <div>
          <IonBackdrop />
          <LogOverview log={viewedLog} close={() => setViewedLog(undefined)} />
        </div>
      )}
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Income</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonCard>
                <IonRow>
                  <CustomCardHeader>
                    <div className="header-select-wrapper">
                      <IonSelect
                        className="header-select"
                        value={chart}
                        onIonChange={(e) => setChart(e.detail.value)}
                      >
                        <IonSelectOption value={1}>Income</IonSelectOption>
                        <IonSelectOption value={2}>
                          Income by category
                        </IonSelectOption>
                      </IonSelect>
                    </div>
                  </CustomCardHeader>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonCardContent className="panel-m">
                      <StackedBarChart
                        levels={getChartData()}
                        color="green"
                        noData={<AddLogButton />}
                      />
                    </IonCardContent>
                  </IonCol>
                </IonRow>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonCard>
            <IonRow>
              <IonCol>
                <CustomCardHeader>
                  <div className="header-text">Details</div>
                </CustomCardHeader>
              </IonCol>

              <DTRowButton onClick={() => setShowDT(!showDT)} isOpen={showDT} />
            </IonRow>
            {showDT && (
              <IonRow>
                <IonCol size="6" className="date">
                  From:
                  <IonDatetimeButton datetime="if"></IonDatetimeButton>
                  <IonModal keepContentsMounted>
                    <IonDatetime
                      id="if"
                      presentation="date"
                      value={dateFrom}
                      onIonChange={(e) =>
                        setDateFrom2(`${e.detail.value!.slice(0, 10)}`)
                      }
                    ></IonDatetime>
                  </IonModal>
                </IonCol>
                <IonCol size="6" className="date">
                  To:
                  <IonDatetimeButton datetime="it"></IonDatetimeButton>
                  <IonModal keepContentsMounted>
                    <IonDatetime
                      id="it"
                      presentation="date"
                      value={dateTo}
                      onIonChange={(e) =>
                        setDateTo2(`${e.detail.value!.slice(0, 10)}`)
                      }
                    ></IonDatetime>
                  </IonModal>
                </IonCol>
              </IonRow>
            )}
            <IonRow>
              <IonCol sizeXs="12" sizeSm="6">
                <IonRow>
                  <CustomCardHeader>
                    <div className="header-text">
                      <Gray>Categories</Gray>
                    </div>
                  </CustomCardHeader>
                </IonRow>
                <IonRow>
                  <IonCol className="panel-l scrollable">
                    <CategoriesList
                      data={getCategories()}
                      onCatClick={catClick}
                      selectedCats={selectedCats}
                    />
                  </IonCol>
                </IonRow>
              </IonCol>
              <IonCol sizeXs="12" sizeSm="6">
                <IonRow>
                  <CustomCardHeader>
                    <div className="header-text">
                      <Gray>Logs</Gray>
                    </div>
                  </CustomCardHeader>
                </IonRow>
                <IonCardContent className="panel-l scrollable">
                  {periodLength > 25 || dateFrom > dateTo ? (
                    <InvalidPeriodPanel type="logs" />
                  ) : (
                    <ShortLogsList
                      logs={getLogs()}
                      setViewedLog={setViewedLog}
                      selectedCats={selectedCats}
                    />
                  )}
                </IonCardContent>
              </IonCol>
            </IonRow>
          </IonCard>
        </IonGrid>
      </IonContent>
      {viewedLog === undefined ? (
        <>
          <ActionFab route="Income" />
          <IonFab slot="fixed" horizontal="end" vertical="bottom">
            <IonFabButton
              color="secondary"
              routerDirection="forward"
              routerLink="/Add-log"
            >
              <IonIcon src={pencil} />
            </IonFabButton>
          </IonFab>
        </>
      ) : (
        <>
          <IonBackdrop />
          <LogOverview log={viewedLog} close={() => setViewedLog(undefined)} />
        </>
      )}
    </IonPage>
  );
};

export default Income;
