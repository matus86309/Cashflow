import { generateColorScale } from "../../theme/colorScales";

const Red: React.FC<{
  children: any;
  className?: string;
}> = (props) => {
  return (
    <span
      style={{ color: generateColorScale(1, "red")[0] }}
      className={props.className}
    >
      {props.children}
    </span>
  );
};

export default Red;
