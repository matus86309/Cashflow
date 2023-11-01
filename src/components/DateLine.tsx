import { monthLabels } from "./global";

const DateLine: React.FC<{
  date: string;
}> = (props) => {
  const day = props.date.substring(6, 8);
  const month = props.date.substring(4, 6);
  const year = props.date.substring(0, 4);
  return (
    <div className="date-line">
      {`${day} ${monthLabels[+month - 1]} ${
        new Date().getFullYear() === +year ? "" : year
      }`}
    </div>
  );
};

export default DateLine;
