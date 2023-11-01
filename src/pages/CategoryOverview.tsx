import {
  IonBackdrop,
  IonButton,
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
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useContext, useState } from "react";
import { useParams } from "react-router";

import { close, construct } from "ionicons/icons";

import CustomCardHeader from "../components/CustomCardHeader";
import DTRowButton from "../components/DTRowButton";
import ShortLogsList from "../components/ShortLogsList";
import SubcategoriesList from "../components/SubcategoriesList";
import LineChart from "../components/charts/LineChart";
import LogOverview from "../components/overviews/LogOverview";
import AddLogButton from "../components/space_fillers/AddLogButton";
import AddSubCategoryButton from "../components/space_fillers/AddSubCategoryButton";
import InvalidPeriodPanel from "../components/space_fillers/InvalidPeriodPanel";
import Gray from "../components/text_styles/Gray";
import Data from "../context/DataContext";

import {
  fromLogType,
  getBalanceFromLogs,
  getLogsFromPeriod,
  newDate,
  toLogType,
} from "../components/global";
import { generateColorScale } from "../theme/colorScales";

const CategoryOverview: React.FC = () => {
  const DBLogs = useContext(Data).DBLogs;
  const setCategoryToEdit = useContext(Data).setCategoryToEdit;
  const currencySymbol = useContext(Data).currencySymbol;

  const [showDT, setShowDT] = useState(false);

  const today = new Date().toISOString().substring(0, 10);
  const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1, 1));

  const [dateTo, setDateTo] = useState(today);
  const [dateFrom, setDateFrom] = useState(
    lastMonth.toISOString().substring(0, 10)
  );

  const periodLength =
    (+dateTo.slice(0, 4) - +dateFrom.slice(0, 4)) * 12 +
    +dateTo.slice(5, 7) -
    +dateFrom.slice(5, 7) +
    1;

  const [viewedLog, setViewedLog] = useState<Log | undefined>(undefined);
  const [selectedSubcats, setSelectedSubcats] = useState<string[]>([]);

  const router = useIonRouter();
  const params = useParams<{ lType: string; name: string }>();

  // Convert selection of type to valid LogType
  const lType = toLogType(params.lType);
  let c = useContext(Data).categories[lType].find(
    (c) => c.name === params.name
  );
  if (params.name === "Uncategorised")
    c = { name: params.name, type: lType, subCats: [] };
  const category = c;
  if (category === undefined) {
    return <h1>404 not found</h1>;
  }

  const getChartData = () => {
    const tLine: ChartLine = {
      name: lType,
      data: [],
      color: generateColorScale(
        1,
        fromLogType(lType, ["green", "red", "yellow"])
      )[0],
    };
    const cLine: ChartLine = {
      name: "category",
      data: [],
      color: "var(--ion-color-secondary)",
    };

    let curMonth = +today.slice(5, 7);
    let curYear = +today.slice(0, 4);

    while (tLine.data.length < 7) {
      const monthName = `${curYear}-${("0" + curMonth).slice(-2)}`;
      const month = DBLogs.find((m) => m.name === monthName);
      // Type Line
      if (month !== undefined && month[lType].length > 0) {
        const balance = month[lType]
          .reduce(
            (acc, l) =>
              lType === "expense" ? acc + Math.abs(l.amount) : acc + l.amount,
            0
          )
          .toFixed(2);
        tLine.data.unshift({
          x: newDate(monthName),
          y: +balance,
          label: balance + currencySymbol,
          noData: false,
        });
      } else {
        tLine.data.unshift({
          x: newDate(monthName),
          y: 0,
          label: "No records",
          noData: true,
        });
      }

      // Category Line
      if (month !== undefined && month[lType].length > 0) {
        const balance = month[lType]
          .reduce(
            (acc, l) =>
              l.category.name === category.name
                ? lType === "expense"
                  ? acc + Math.abs(l.amount)
                  : acc + l.amount
                : acc,
            0
          )
          .toFixed(2);

        if (+balance === 0) {
          cLine.data.unshift({
            x: newDate(monthName),
            y: 0,
            label: "No records",
            noData: true,
          });
        } else {
          cLine.data.unshift({
            x: newDate(monthName),
            y: +balance,
            label: balance + currencySymbol,
            noData: false,
          });
        }
      } else {
        cLine.data.unshift({
          x: newDate(monthName),
          y: 0,
          label: "No records",
          noData: true,
        });
      }

      curMonth--;
      if (curMonth === 0) {
        curMonth = 12;
        curYear--;
      }
    }
    return [tLine, cLine];
  };

  const getLogs = (): Log[] => {
    return getLogsFromPeriod(DBLogs, { dateFrom, dateTo }, lType);
  };

  const getSubcategories = () => {
    const logs = getLogs();
    if (category.subCats.length > 0)
      return category.subCats.map((s) => {
        let balance = 0;
        balance += getBalanceFromLogs(logs, category.name, s);
        return { name: s, balance };
      });
    return [];
  };

  const subCatClick = (name: string) => {
    if (selectedSubcats.find((n) => n === name) === undefined) {
      setSelectedSubcats([...selectedSubcats, name]);
    } else {
      setSelectedSubcats([...selectedSubcats.filter((n) => n !== name)]);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton routerLink={`/${params.lType}`}>
              <IonIcon src={close} />
            </IonButton>
          </IonButtons>
          <IonTitle>{params.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonCard>
            <IonRow>
              <IonCol>
                <CustomCardHeader>
                  <Gray>Balance</Gray>
                </CustomCardHeader>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12" className="panel-m">
                <IonCardContent>
                  <LineChart lines={getChartData()} noData={<AddLogButton />} />
                </IonCardContent>
              </IonCol>
            </IonRow>
          </IonCard>
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
                  <IonDatetimeButton datetime="cf"></IonDatetimeButton>
                  <IonModal keepContentsMounted>
                    <IonDatetime
                      id="cf"
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
                  <IonDatetimeButton datetime="ct"></IonDatetimeButton>
                  <IonModal keepContentsMounted>
                    <IonDatetime
                      id="ct"
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
                      <Gray>Subcategories</Gray>
                    </div>
                  </CustomCardHeader>
                </IonRow>
                <IonCardContent className="panel-l scrollable">
                  {category && category.subCats.length > 0 ? (
                    <SubcategoriesList
                      data={getSubcategories()}
                      onCatClick={subCatClick}
                      selectedCats={selectedSubcats}
                    />
                  ) : params.name === "Uncategorised" ? (
                    <div className="space-filler content-center">
                      No subcategories
                    </div>
                  ) : (
                    <AddSubCategoryButton category={category} />
                  )}
                </IonCardContent>
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
                      selectedCats={[category.name]}
                      selectedSubcats={selectedSubcats}
                    />
                  )}
                </IonCardContent>
              </IonCol>
            </IonRow>
          </IonCard>
        </IonGrid>
      </IonContent>

      {viewedLog === undefined ? (
        params.name !== "Uncategorised" && (
          <IonFab slot="fixed" horizontal="start" vertical="bottom">
            <IonFabButton
              onClick={() => {
                setCategoryToEdit(category);
                router.push(`/Edit-category`);
              }}
              color="secondary"
            >
              <IonIcon src={construct} />
            </IonFabButton>
          </IonFab>
        )
      ) : (
        <>
          <IonBackdrop />
          <LogOverview log={viewedLog} close={() => setViewedLog(undefined)} />
        </>
      )}
    </IonPage>
  );
};

export default CategoryOverview;
