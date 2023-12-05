import { VictoryContainer, VictoryPie, VictoryTooltip } from "victory";

import { colorScaleDefault, generateColorScale } from "../../theme/colorScales";

const PieChart: React.FC<{
  orderedData: { name: string; balance: number }[];
  colorScale: string[];
  selectedValue?: number | undefined;
  setSelectedValue?: React.Dispatch<React.SetStateAction<number | undefined>>;
}> = (props) => {
  const getChartData = () => {
    if (props.orderedData.length > 9) {
      const balanceAfterNine = props.orderedData.reduce((acc, obj, index) => {
        if (index >= 9) {
          return acc + obj.balance;
        } else {
          return acc;
        }
      }, 0);
      return [
        ...props.orderedData.slice(0, 9),
        {
          name: "other",
          balance: balanceAfterNine,
          color: colorScaleDefault[9],
        },
      ].map((item) => {
        return { x: "", y: Math.abs(item.balance), label: item.name };
      });
    } else
      return props.orderedData.map((item) => {
        return {
          x: "",
          y: Math.abs(item.balance),
          label: item.name,
        };
      });
  };

  const getColorScale = () => {
    if (props.selectedValue === undefined) {
      return props.colorScale;
    } else {
      let cl = [];
      for (let i = 0; i < 10; i++) {
        cl.push(generateColorScale(props.orderedData.length, "gray")[i]);
      }
      cl[props.selectedValue] = props.colorScale[props.selectedValue];
      return cl;
    }
  };

  return props.orderedData.length > 0 ? (
    <div>
      <VictoryPie
        labelComponent={
          <VictoryTooltip
            flyoutStyle={{
              fill: "var(--ion-color-light)",
              stroke: "var(--ion-color-medium)",
            }}
            cornerRadius={1}
          />
        }
        containerComponent={
          <VictoryContainer style={{ touchAction: "auto" }} />
        }
        data={getChartData()}
        colorScale={getColorScale()}
        height={300}
        width={300}
        events={[
          {
            childName: "All",
            target: "data",
            eventHandlers: {
              onClick: (e, { index }) => {
                props.setSelectedValue &&
                  props.setSelectedValue(
                    props.selectedValue === index ? undefined : index
                  );
              },
            },
          },
        ]}
        style={{ labels: { fill: "var(--ion-color-dark)" } }}
      />
    </div>
  ) : (
    <span className="content-center-square">
      No records
      <br />
      this month
    </span>
  );
};

export default PieChart;
