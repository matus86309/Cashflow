import {
  IonCard,
  IonCol,
  IonRow,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import Balance from "./Balance";
import CustomCardHeader from "./CustomCardHeader";
import Legend from "./charts/Legend";
import PieChart from "./charts/PieChart";

import { generateColorScale } from "../theme/colorScales";
import { fromLogType, getMonth, logTypes } from "./global";
import Data from "../context/DataContext";

const HomePieChartPanel: React.FC<{
  overviewTypeState: [LogType, Dispatch<SetStateAction<LogType>>];
  month: string;
}> = (props) => {
  const DBLogs = useContext(Data).DBLogs;
  const [selectedValue, setSelectedValue] = useState<number | undefined>();
  const [overviewType, setOverviewType] = props.overviewTypeState;

  // reset the selected value when changing charts
  useEffect(() => setSelectedValue(undefined), [overviewType]);

  let unsortedData = getMonth(DBLogs, props.month)[overviewType].map((l) => ({
    category: l.category.name,
    amount: l.amount,
  }));
  const sortedData = [];

  // Get total balance of each income category from separate logs
  while (unsortedData.length > 0) {
    const curName = unsortedData[0].category;
    sortedData.push({
      name: curName,
      balance: +unsortedData
        .reduce(
          (acc, cur) => (acc += cur.category === curName ? cur.amount : 0),
          0
        )
        .toFixed(2),
    });
    unsortedData = unsortedData.filter((i) => i.category !== curName);
  }

  // data ordered from biggest to smallest absolute value of balance
  const data = sortedData.sort(
    (a, b) => Math.abs(b.balance) - Math.abs(a.balance)
  );

  const colorScale = generateColorScale(
    data.length,
    fromLogType(overviewType, ["green", "red", "yellow"])
  );

  const totalBalance = +data
    .reduce((acc, cur) => acc + cur.balance, 0)
    .toFixed(2);

  // do not display anything because previous panel provides no data message
  if (data.length === 0) return <></>;

  return (
    <IonRow>
      <IonCol>
        <IonCard>
          <IonRow>
            <IonCol>
              <IonRow>
                <CustomCardHeader>
                  <div className="header-select-wrap">
                    <IonSelect
                      className="header-select"
                      value={overviewType}
                      onIonChange={(e) => setOverviewType(e.detail.value!)}
                    >
                      {logTypes.map((l, index) => (
                        <IonSelectOption value={l} key={index}>
                          {fromLogType(l)}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </div>
                </CustomCardHeader>
              </IonRow>
              <IonRow>
                <IonCol
                  size="12"
                  sizeMd="6"
                  className="pie-chart-wrap content-center"
                >
                  <div>
                    <div className="chart-container">
                      <PieChart
                        orderedData={data}
                        colorScale={colorScale}
                        selectedValue={selectedValue}
                        setSelectedValue={setSelectedValue}
                      />
                    </div>
                    <div
                      className="ion-text-center"
                      style={{ marginTop: "-7.5vh", fontSize: "1.35em" }}
                    >
                      <br />
                      <Balance balance={totalBalance} />
                    </div>
                  </div>
                </IonCol>
                <IonCol size="12" sizeMd="6" className="content-center">
                  <Legend
                    className="panel-m legend-container-12"
                    orderedData={data}
                    colorScale={colorScale}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                  />
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default HomePieChartPanel;
