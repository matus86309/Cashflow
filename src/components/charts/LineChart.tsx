import { scaleLinear } from "d3-scale";
import {
  DomainTuple,
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTooltip,
} from "victory";

import { useContext, useEffect, useState } from "react";

import Data from "../../context/DataContext";
import AddLogButton from "../space_fillers/AddLogButton";
import ZoomVoronoiContainer from "./ZoomVoronoiContainer";

import { getChartSize, newDate } from "../global";

const LineChart: React.FC<{
  lines: ChartLine[];
  noData?: JSX.Element;
}> = (props) => {
  const currencySymbol = useContext(Data).currencySymbol;

  let dataNotEmpty = false;
  props.lines.forEach((line) => {
    line.data.forEach((m) => {
      dataNotEmpty = dataNotEmpty || !m.noData;
    });
  });

  // x and y values of all levels
  const values: { x: Date[]; y: number[] } = props.lines
    .flatMap((line) => line.data.map((dp) => ({ x: dp.x, y: dp.y })))
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
  domainStart.setHours(0);
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
          <ZoomVoronoiContainer
            zoomDomain={zoomDomain}
            onZoomDomainChange={setZoomDomain}
            allowZoom={false}
            allowPan={domainViewStart > domainStart}
            voronoiPadding={50}
            zoomDimension="x"
          />
        }
      >
        {props.lines.map((line, index) => (
          <VictoryLine
            name={line.name}
            style={{
              data: {
                stroke: line.color,
                strokeWidth: (x: any) => (x.active ? "6px" : "3px"),
                zIndex: (x: any) => (x.active ? "10" : "0"),
              },
            }}
            domain={domain}
            data={line.data}
            labelComponent={<VictoryTooltip constrainToVisibleArea />}
            key={index}
          />
        ))}
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

export default LineChart;
