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

const Mixed: React.FC = () => {
  const DBLogs = useContext(Data).DBLogs;
  const categories = useContext(Data).categories;
  const currencySymbol = useContext(Data).currencySymbol;

  const [showDT, setShowDT] = useState(false);

  const today = new Date().toISOString().substring(0, 10);
  const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1, 1))
    .toISOString()
    .substring(0, 10);

  const [dateTo, setDateTo] = useState(today);
  const [dateFrom, setDateFrom] = useState(lastMonth);

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
      // Mixed data
      return [
        months.map((m) => {
          if (m.mixed.length > 0) {
            const balance = m.mixed
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
      // Mixed by category data
      return [{ name: "Uncategorised" }, ...categories.mixed].map((cat) => {
        // layers
        return months.map((m) => {
          let y = 0;
          let noData = true;
          m.mixed.forEach((l) => {
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
    return getLogsFromPeriod(DBLogs, { dateFrom, dateTo }, "mixed");
  };

  const getCategories = () => {
    const logs = getLogs();
    if (categories.mixed.length > 0)
      return [{ name: "Uncategorised" }, ...categories.mixed].map((c) => {
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
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mixed</IonTitle>
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
                        <IonSelectOption value={1}>Mixed</IonSelectOption>
                        <IonSelectOption value={2}>
                          Mixed by category
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
                        color="yellow"
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
                  <IonDatetimeButton datetime="mf"></IonDatetimeButton>
                  <IonModal keepContentsMounted>
                    <IonDatetime
                      id="mf"
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
                  <IonDatetimeButton datetime="mt"></IonDatetimeButton>
                  <IonModal keepContentsMounted>
                    <IonDatetime
                      id="mt"
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
              <IonCol sizeXs="12" sizeSm="6">
                <IonRow>
                  <CustomCardHeader>
                    <div className="header-text">
                      <Gray>Categories</Gray>
                    </div>
                  </CustomCardHeader>
                </IonRow>
                <IonRow>
                  <IonCol className="panel-m scrollable">
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
                <IonCardContent className="panel-m scrollable">
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
          <ActionFab route="Mixed" />
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

export default Mixed;
