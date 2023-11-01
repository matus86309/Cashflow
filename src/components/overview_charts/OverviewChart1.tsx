import { useContext } from "react";

import Data from "../../context/DataContext";
import LineChart from "../charts/LineChart";
import AddLogButton from "../space_fillers/AddLogButton";

import { getMonth, logTypes, newDate } from "../global";

const OverviewChart1: React.FC = () => {
  const DBLogs = useContext(Data).DBLogs;
  const currencySymbol = useContext(Data).currencySymbol;
  const earliestMonth = useContext(Data).earliestMonth;

  // Balance line
  const bLine: ChartLine = {
    name: "Balance",
    data: [],
    color: "var(--ion-color-tertiary)",
  };

  const today = new Date().toISOString();

  let curMonth = +today.slice(5, 7);
  let curYear = +today.slice(0, 4);
  while (earliestMonth <= newDate(new Date(curYear, curMonth, 1))) {
    const monthName = `${curYear}-${("0" + curMonth).slice(-2)}`;
    const month = getMonth(DBLogs, monthName);

    if (
      month !== undefined &&
      (month.income.length > 0 ||
        month.expense.length > 0 ||
        month.mixed.length > 0)
    ) {
      const balance = logTypes
        .map((t) => month[t].reduce((acc, l) => acc + l.amount, 0))
        .reduce((acc, balance) => acc + balance, 0)
        .toFixed(2);

      bLine.data.unshift({
        x: newDate(monthName),
        y: +balance,
        label: `${+balance > 0 ? "+" : ""}${balance + currencySymbol}`,
        noData: false,
      });
    } else {
      bLine.data.unshift({
        x: newDate(monthName),
        y: 0,
        label: "No records",
        noData: true,
      });
    }
    curMonth--;
    if (curMonth === 0) {
      curMonth = 12;
      curYear--;
    }
  }

  return <LineChart lines={[bLine]} noData={<AddLogButton />} />;
};

export default OverviewChart1;
