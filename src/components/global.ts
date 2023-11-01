import { useIonAlert } from "@ionic/react";

//
//    Custom react hooks
//

export const useAlert = () => {
  const [presentAlert] = useIonAlert();
  const showAlert = (message: string, onConfirm: () => void) =>
    presentAlert({
      header: "Attention",
      message,
      buttons: ["Cancel", { text: "Confirm", role: "confirm" }],
      onDidDismiss: (e) => {
        e.detail.role === "confirm" && onConfirm();
      },
    });
  return showAlert;
};

//
//    Functions
//

export const filterInput = (text: string, type: "numbers" | "alfanumerics") => {
  return type === "numbers"
    ? text.replace(/[^0-9.,-]+/g, "").replaceAll(",", ".")
    : text.replace(/[^a-zA-ZÀ-ž0-9()+&\-,. ]+/g, "");
};

export const fromLogType = (
  string: LogType,
  replaceWith: string[] = ["Income", "Expenses", "Mixed"]
): any => {
  if (string === "income") return replaceWith[0];
  else if (string === "expense") return replaceWith[1];
  return replaceWith[2];
};

export const getBalanceFromLogs = (
  logs: Log[],
  category: string,
  subcategory?: string
): number => {
  let balance = 0;
  if (subcategory === undefined)
    logs.forEach((l) => {
      if (l.category.name === category) balance += l.amount;
    });
  else
    logs.forEach((l) => {
      if (l.category.name === category && l.category.subCat === subcategory)
        balance += l.amount;
    });

  return balance;
};

export const getChartSize = () => {
  const ratio = window.innerHeight / window.innerWidth;
  const height = 1.2 * window.innerHeight * ratio * 0.9;
  const width = (1.2 * window.innerHeight) / ratio;
  if (width * 0.8 > height) {
    if (height * 2 < width) {
      return { height: height * 1.5, width: height * 3 };
    } else return { height, width };
  } else return { height: width * 0.7, width };
};

export const getLastMonths = (DBLogs: Month[], period: number): Month[] => {
  const months: Month[] = [];
  let year = new Date().getFullYear();
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
  let month = new Date().getMonth() + 1;

  while (months.length < period) {
    const m = DBLogs.find(
      (m) => m.name === `${year}-${month < 10 ? "0" + month : month}`
    );

    if (m !== undefined) {
      months.unshift(m);
    } else {
      months.unshift({
        name: `${year}-${month < 10 ? "0" + month : month}`,
        income: [],
        expense: [],
        mixed: [],
      });
    }
    month--;
    if (month === 0) {
      month = 12;
      year--;
    }
  }
  return months;
};

export const getMonths = (
  DBLogs: Month[],
  lastMonth: string,
  periodLength: number
) => {
  const months: Month[] = [];
  let year = new Date(lastMonth).getFullYear();
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
  let month = new Date(lastMonth).getMonth() + 1;

  while (months.length < periodLength) {
    const m = DBLogs.find(
      (m) => m.name === `${year}-${month < 10 ? "0" + month : month}`
    );

    if (m !== undefined) {
      months.unshift(m);
    } else {
      months.unshift({
        name: `${year}-${month < 10 ? "0" + month : month}`,
        income: [],
        expense: [],
        mixed: [],
      });
    }
    month--;
    if (month === 0) {
      month = 12;
      year--;
    }
  }
  return months;
};

export const getLogsFromLastMonths = (
  DBLogs: Month[],
  t: LogType,
  period: number
): Log[] => {
  return getLastMonths(DBLogs, period).flatMap((m) => m[t]);
};

export const getLogsFromPeriod = (
  DBLogs: Month[],
  period: Period,
  t: LogType | "all"
): Log[] => {
  const months: Month[] = [];
  const from = {
    y: +period.dateFrom.slice(0, 4),
    m: +period.dateFrom.slice(5, 7),
    d: +period.dateFrom.slice(8, 10),
  };
  const to = {
    y: +period.dateTo.slice(0, 4),
    m: +period.dateTo.slice(5, 7),
    d: +period.dateTo.slice(8, 10),
  };
  DBLogs.forEach((m) => {
    const valueM = +m.name.slice(0, 4) * 100 + +m.name.slice(5, 7);
    if (to.y * 100 + to.m >= valueM && valueM >= from.y * 100 + from.m)
      months.push(m);
  });
  // extract logs from months
  const logs: Log[] =
    t === "all"
      ? [
          ...months.flatMap((m) => m["income"]),
          ...months.flatMap((m) => m["expense"]),
          ...months.flatMap((m) => m["mixed"]),
          // filter out logs that do not fit into the date interval
        ]
      : months.flatMap((m) => m[t]);
  return logs.filter((l) => {
    const valueL = +`${l.date.slice(0, 4)}${l.date.slice(5, 7)}${l.date.slice(
      8,
      10
    )}`;
    return (
      to.y * 10000 + to.m * 100 + to.d >= valueL &&
      valueL >= from.y * 10000 + from.m * 100 + from.d
    );
  });
};

export const getMonth = (DBLogs: Month[], name: string) => {
  return (
    DBLogs.find((m) => m.name === name) || {
      name,
      income: [],
      expense: [],
      mixed: [],
    }
  );
};

/* does exactly what new Date, except returns the date with the time set to 00:00:00:00
   for correct display of charts and correct comparisons, where the time plays no role */
export const newDate = (date: any = new Date()) =>
  new Date(new Date(date).setHours(0, 0, 0, 0));

export const sortMonths = (data: Month[]): Month[] => {
  data = data.sort((a, b) => +b.name.substring(5, 7) - +a.name.substring(5, 7));
  data = data.sort((a, b) => +b.name.substring(0, 4) - +a.name.substring(0, 4));
  return data;
};

export const toLogType = (string: string): LogType => {
  if (string === "Income") return "income";
  else if (string === "Expenses") return "expense";
  return "mixed";
};

//
//    Variables
//

export const currencySymbols = ["€", "$", "¥"];

export const logTypes: LogType[] = ["income", "expense", "mixed"];

export const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
