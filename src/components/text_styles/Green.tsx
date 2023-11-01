import { generateColorScale } from "../../theme/colorScales";

const Green: React.FC<{
  children: any;
  className?: string;
}> = (props) => {
  return (
    <span
      style={{ color: generateColorScale(1, "green")[0] }}
      className={props.className}
    >
      {props.children}
    </span>
  );
};

export default Green;
