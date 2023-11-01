/// <reference types="react-scripts" />

type Category = {
  name: string;
  type: LogType;
  subCats: string[];
};
type Categories = {
  income: Category[];
  expense: Category[];
  mixed: Category[];
}

type ChartLine = {
  name: string;
  color: string;
  data: ChartLineData;
};
type ChartLineData = { x: Date; y: number; label: string; noData: boolean }[];

type Datapoint = { name: Date; value: number };

type Day = { date: string; logs: Log[] };

type Debt = {
  id: number;
  type: DebtType;
  name: string;
  amount: number;
  date: string | undefined;
  until: string | undefined;
  note: string;
};
type DebtType = "lent" | "borrowed";
type Debts = { lent: Debt[]; borrowed: Debt[] };

type Log = {
  id: number;
  type: LogType;
  category: LogCategory;
  amount: number;
  date: string;
  note: string;
};
type LogCategory = {
  name: string;
  subCat?: string;
};
type LogType = "income" | "expense" | "mixed";
type Month = { name: string; income: Log[]; expense: Log[]; mixed: Log[] };

type Period = { dateFrom: string; dateTo: string };

type Settings = [boolean, number, number, boolean]