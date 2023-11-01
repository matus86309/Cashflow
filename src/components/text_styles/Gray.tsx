import { generateColorScale } from "../../theme/colorScales";

const Gray: React.FC<{
  children: any;
  className?: string;
}> = (props) => {
  return (
    <span
      style={{ color: generateColorScale(1, "gray")[0] }}
      className={props.className}
    >
      {props.children}
    </span>
  );
};

export default Gray;
