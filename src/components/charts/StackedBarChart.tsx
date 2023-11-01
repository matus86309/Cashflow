import { scaleLinear } from "d3-scale";
import {
  DomainTuple,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTooltip,
  VictoryZoomContainer,
} from "victory";

import { useContext, useEffect, useState } from "react";

import Data from "../../context/DataContext";
import { generateColorScale } from "../../theme/colorScales";
import AddLogButton from "../space_fillers/AddLogButton";

import { getChartSize, newDate } from "../global";

const StackedBarChart: React.FC<{
  levels: ChartLineData[];
  color: "green" | "red" | "yellow";
  noData?: JSX.Element;
}> = (props) => {
  const currencySymbol = useContext(Data).currencySymbol;

  let dataNotEmpty = false;
  props.levels.forEach((level) => {
    level.forEach((dp) => {
      dataNotEmpty = dataNotEmpty || !dp.noData;
    });
  });
  const values: { x: Date[]; y: number[] } = props.levels
    .flatMap((level) => level.map(({ x, y }) => ({ x, y })))
    .reduce(
      (acc: { x: Date[]; y: number[] }, dataset) => ({
        x: [...acc.x, dataset.x],
        y: [...acc.y, dataset.y],
      }),
      { x: [], y: [] }
    );

  const domainEnd = newDate();
  domainEnd.setMonth(domainEnd.getMonth(), 15);
  const domainStart = newDate(Math.min(...values.x.map((d) => d.getTime())));
  domainStart.setMonth(domainStart.getMonth() - 1, 15);
  const domainViewStart = newDate();
  domainViewStart.setMonth(domainViewStart.getMonth() - 6, 15);

  const domain: { x: DomainTuple; y: DomainTuple } = {
    x: [domainStart, domainEnd],
    y: values.y.reduce(
      (extremes, value) => [
        extremes[0] * 1.1 < value * 1.1 ? extremes[0] : value * 1.1,
        extremes[1] * 1.1 > value * 1.1 ? extremes[1] : value * 1.1,
      ],
      [0, 0]
    ),
  };
  const [zoomDomain, setZoomDomain] = useState<{
    x: DomainTuple;
    y: DomainTuple;
  }>({ x: [domainViewStart, domainEnd], y: domain.y });

  const [chartSize, setChartSize] = useState(getChartSize());

  const getColorScale = () => {
    const n = props.levels.length;
    return generateColorScale(n, props.color);
  };

  useEffect(() => {
    const handleResize = () => {
      setChartSize(getChartSize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  if (domainStart === domainEnd || dataNotEmpty === false)
    return <AddLogButton />;
  return (
    <div className="chart">
      <VictoryChart
        height={chartSize.height}
        width={chartSize.width}
        domain={domain}
        scale={{ x: "time", y: "linear" }}
        containerComponent={
          <VictoryZoomContainer
            zoomDomain={zoomDomain}
            onZoomDomainChange={setZoomDomain}
            allowZoom={false}
            zoomDimension="x"
          />
        }
      >
        <VictoryStack
          labelComponent={<VictoryTooltip />}
          colorScale={getColorScale()}
        >
          {props.levels.map((level, index) => (
            <VictoryBar data={level} key={index} />
          ))}
        </VictoryStack>

        <VictoryAxis
          domain={domain.y}
          style={{
            axis: { stroke: "var(--ion-color-dark)" },
            tickLabels: { fill: "var(--ion-color-dark)" },
            grid: {
              stroke: ({ tick }: { tick: number }) =>
                tick === 0 ? "var(--ion-color-medium)" : undefined,
              zIndex: "0 !important",
            },
          }}
          tickValues={scaleLinear().domain(domain.y).ticks(5)}
          tickFormat={(t) => (t === 0 ? t : t + currencySymbol)}
          dependentAxis
        />
        <VictoryAxis
          domain={zoomDomain.x}
          tickFormat={(date: string) =>
            `${new Date(date).toLocaleDateString(undefined, {
              month: "short",
            })}\n${new Date(date).getFullYear()} `
          }
          style={{
            axis: { stroke: "var(--ion-color-dark)" },
            tickLabels: { fill: "var(--ion-color-dark)" },
          }}
          axisValue={domain.y[0]}
        />
      </VictoryChart>
    </div>
  );
};

export default StackedBarChart;