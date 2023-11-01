import { IonCol, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";

import Balance from "./Balance";
import Legend from "./charts/Legend";
import PieChart from "./charts/PieChart";

import { generateColorScale } from "../theme/colorScales";

const HomeChart2: React.FC<{
  color: "green" | "red" | "yellow";
  data: { name: string; balance: number }[];
}> = (props) => {
  const [selectedValue, setSelectedValue] = useState<number | undefined>();

  // reset the selected value when changing charts
  useEffect(() => setSelectedValue(undefined), [props.color]);

  const colorScale = generateColorScale(props.data.length, props.color);
  const totalBalance = +props.data
    .reduce((acc, cur) => acc + cur.balance, 0)
    .toFixed(2);

  return (
    <IonRow>
      <IonCol size="12" sizeMd="6" className="pie-chart-wrap content-center">
        <div>
          <div className="chart-container">
            <PieChart
              orderedData={props.data}
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
          orderedData={props.data}
          colorScale={colorScale}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      </IonCol>
    </IonRow>
  );
};

export default HomeChart2;
