import { colorScaleDefault } from "../../theme/colorScales";

import LegendItem from "../items/LegendItem";

const Legend: React.FC<{
  orderedData: { name: string; balance: number }[];
  colorScale: string[];
  selectedValue?: number | undefined;
  setSelectedValue?: React.Dispatch<React.SetStateAction<number | undefined>>;
  className: string;
}> = (props) => {
  const assignColors = (
    d: Array<{ name: string; balance: number }>
  ): Array<{ name: string; balance: number; color: string }> => {
    return d.map((obj, index) => ({
      ...obj,
      color: index > 9 ? colorScaleDefault[9] : props.colorScale[index],
    }));
  };

  const legendData = assignColors(props.orderedData);

  return (
    <div className={props.className}>
      <div className="legend-container-inner">
        {legendData.map((item, index) => {
          return (
            <LegendItem
              item={item}
              selected={index === props.selectedValue}
              onClick={() =>
                props.setSelectedValue &&
                props.setSelectedValue(
                  props.selectedValue === index ? undefined : index
                )
              }
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Legend;
