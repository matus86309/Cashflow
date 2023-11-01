import { generateColorScale } from "../../theme/colorScales";

const Yellow: React.FC<{
  children: any;
  className?: string;
}> = (props) => {
  return (
    <span
      style={{ color: generateColorScale(1, "yellow")[0] }}
      className={props.className}
    >
      {props.children}
    </span>
  );
};

export default Yellow;
