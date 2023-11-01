import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTooltip,
} from "victory";

import { useEffect, useState } from "react";

import { generateColorScale } from "../../theme/colorScales";
import { getChartSize } from "../global";

const BarChart: React.FC<{
  data: ChartLineData;
  noData?: JSX.Element;
}> = (props) => {
  // check whether props.data contains any data
  let dataNotEmpty = false;
  props.data.forEach((d) => {
    dataNotEmpty = dataNotEmpty || !d.noData;
  });

  const [chartSize, setChartSize] = useState(getChartSize());

  useEffect(() => {
    const handleResize = () => {
      setChartSize(getChartSize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (dataNotEmpty)
    return (
      <VictoryChart
        height={chartSize.height}
        width={chartSize.width}
        domainPadding={{ x: chartSize.width * 0.15, y: chartSize.height * 0.1 }}
      >
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: "var(--ion-color-dark)" },
            tickLabels: { fill: "var(--ion-color-dark)" },
            grid: { stroke: "var(--ion-color-medium" },
          }}
        />
        <VictoryAxis
          style={{
            axis: { stroke: "var(--ion-color-dark)" },
            tickLabels: { fill: "var(--ion-color-dark)" },
          }}
        />
        <VictoryStack
          colorScale={[
            generateColorScale(1, "green"),
            generateColorScale(1, "red"),
            generateColorScale(1, "yellow"),
            generateColorScale(10, "yellow")[8],
          ].flatMap((c) => c)}
        >
          {props.data.map((dp, index) => (
            <VictoryBar
              labelComponent={
                <VictoryTooltip
                  style={{ fill: "var(--ion-color-dark)" }}
                  flyoutStyle={{
                    fill: "var(--ion-color-light)",
                    stroke: "var(--ion-color-medium)",
                  }}
                  cornerRadius={1}
                />
              }
              data={[dp]}
              key={index}
            />
          ))}
        </VictoryStack>
      </VictoryChart>
    );
  else return props.noData ? props.noData : <div />;
};

export default BarChart;
