import { useContext } from "react";

import Data from "../../context/DataContext";
import LineChart from "../charts/LineChart";
import AddLogButton from "../space_fillers/AddLogButton";

import { generateColorScale } from "../../theme/colorScales";
import { newDate } from "../global";

const OverviewChart3: React.FC = () => {
  const DBLogs = useContext(Data).DBLogs;
  const currencySymbol = useContext(Data).currencySymbol;
  const earliestMonth = useContext(Data).earliestMonth;
  
  const today = new Date().toISOString()

  let curMonth = +today.slice(5, 7);
  let curYear = +today.slice(0, 4);

  const iLine: ChartLine = {
    name: "Income",
    color: generateColorScale(1, "green")[0],
    data: [],
  };
  const eLine: ChartLine = {
    name: "Expense",
    color: generateColorScale(1, "red")[0],
    data: [],
  };
  const mLine: ChartLine = {
    name: "Mixed",
    color: generateColorScale(1, "yellow")[0],
    data: [],
  };

  while (earliestMonth < newDate(new Date(curYear, curMonth, 1))) {
    const monthName = `${curYear}-${("0" + curMonth).slice(-2)}`;
    const month = DBLogs.find((m) => m.name === monthName);

    // Income line
    if (month !== undefined && month.income.length > 0) {
      const balance = month.income
        .reduce((acc, l) => acc + l.amount, 0)
        .toFixed(2);
      iLine.data.unshift({
        x: newDate(monthName),
        y: +balance,
        label: balance + currencySymbol,
        noData: false,
      });
    } else {
      iLine.data.unshift({
        x: newDate(monthName),
        y: 0,
        label: "No records",
        noData: true,
      });
    }

    // Expense Line
    if (month !== undefined && month.expense.length > 0) {
      const balance = month.expense
        .reduce((acc, l) => acc + l.amount, 0)
        .toFixed(2);

      eLine.data.unshift({
        x: newDate(monthName),
        y: +balance,
        label: balance + currencySymbol,
        noData: false,
      });
    } else {
      eLine.data.unshift({
        x: newDate(monthName),
        y: 0,
        label: "No records",
        noData: true,
      });
    }
    // Mixed Line
    if (month !== undefined && month.mixed.length > 0) {
      const balance = month.mixed
        .reduce((acc, l) => (acc += l.amount), 0)
        .toFixed(2);
      mLine.data.unshift({
        x: newDate(monthName),
        y: +balance,
        label: `${+balance > 0 ? "+" : ""}${balance + currencySymbol}`,
        noData: false,
      });
    } else {
      mLine.data.unshift({
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

  return <LineChart lines={[iLine, mLine, eLine]} noData={<AddLogButton />} />;
};

export default OverviewChart3;
