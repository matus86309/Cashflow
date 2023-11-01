import { createContext, ReactNode, useEffect, useState } from "react";

import { currencySymbols, logTypes, newDate } from "../components/global";
import { mockData } from "../components/mock_data";

const Data = createContext<{
  categories: Categories;
  DBLogs: Month[];
  debts: Debts;
  addLog: (l: Log) => void;
  addCategory: (c: Category) => void;
  addDebt: (d: Debt) => void;
  setLogToEdit: (l: Log) => void;
  logToEdit: Log | undefined;
  editLog: (l: Log) => void;
  setCategoryToEdit: (c: Category) => void;
  categoryToEdit: Category | undefined;
  editCategory: (
    c: Category,
    renamedSubCats: [string, string][],
    removedSubCats: string[]
  ) => void;
  setDebtToEdit: (d: Debt) => void;
  debtToEdit: Debt | undefined;
  editDebt: (d: Debt) => void;
  deleteLog: (l: Log) => void;
  deleteCat: (c: Category, t: LogType) => void;
  deleteDebt: (d: Debt) => void;
  savedSettings: Settings;
  updateSettings: (currentSettings: Settings) => void;
  currencySymbol: string;
  defaultLogType: LogType;
  earliestMonth: Date;
}>({
  categories: {
    income: [],
    expense: [],
    mixed: [],
  },
  DBLogs: [],
  debts: { lent: [], borrowed: [] },
  addLog: () => {},
  addCategory: () => {},
  addDebt: () => {},
  setLogToEdit: () => {},
  logToEdit: undefined,
  editLog: () => {},
  setCategoryToEdit: () => {},
  categoryToEdit: undefined,
  editCategory: () => {},
  setDebtToEdit: () => {},
  debtToEdit: undefined,
  editDebt: () => {},
  deleteLog: () => {},
  deleteCat: () => {},
  deleteDebt: () => {},
  savedSettings: [true, 0, 0, true],
  updateSettings: () => {},
  currencySymbol: "",
  defaultLogType: "expense",
  earliestMonth: new Date(),
});

export const DataProvider: React.FC<{ children?: ReactNode }> = (props) => {
  const [logToEdit, setLTE] = useState<Log | undefined>();
  const [categoryToEdit, setCTE] = useState<Category | undefined>();
  const [debtToEdit, setDTE] = useState<Debt | undefined>();

  const getSettings = (): Settings => {
    const settingsJSON = localStorage.getItem("settings");

    // update this default value with every new setting
    if (settingsJSON === null) return [false, 0, 1, false];
    else return JSON.parse(settingsJSON);
  };

  const [savedSettings, setSavedSettings] = useState<Settings>(getSettings());
  const getData = () => {
    if (savedSettings[2]) return mockData;
    else {
      const dataJSON = localStorage.getItem("data");
      return {
        debts:
          dataJSON !== null
            ? JSON.parse(dataJSON).debts
            : { lent: [], borrowed: [] },
        DBLogs: dataJSON !== null ? JSON.parse(dataJSON).DBLogs : [],
        categories:
          dataJSON !== null
            ? JSON.parse(dataJSON).categories
            : {
                income: [],
                expense: [],
                mixed: [],
              },
      };
    }
  };
  const data = getData();
  const [debts, setDebts] = useState<Debts>(data.debts);
  const [DBLogs, setDBLogs] = useState<Month[]>(data.DBLogs);
  const [categories, setCategories] = useState<Categories>(data.categories);

  const saveSettings = (currentSettings: Settings) => {
    localStorage.setItem("settings", JSON.stringify(currentSettings));
  };

  // saves Logs, Categories and Debts into designated storage
  const saveData = () => {
    if (!savedSettings[2]) {
      localStorage.setItem(
        "data",
        JSON.stringify({
          DBLogs,
          categories,
          debts,
        })
      );
    }
  };
  useEffect(() => {
    if (savedSettings[0] === true) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [savedSettings]);

  //
  //  Adding functions
  //

  const addLog = (log: Log) => {
    const monthName = log.date.slice(0, 7);

    if (DBLogs.find((m) => m.name === monthName) === undefined) {
      DBLogs.push({
        name: monthName,
        income: [],
        expense: [],
        mixed: [],
      });
    }
    setDBLogs([
      ...DBLogs.map((m) => {
        if (m.name === monthName) m[log.type].push(log);
        return m;
      }),
    ]);
    saveData();
  };
  const addCategory = (category: Category) => {
    categories[category.type].push(category);
    setCategories({ ...categories });
    saveData();
  };
  const addDebt = (debt: Debt) => {
    debts[debt.type].push(debt);
    setDebts({ ...debts });
    saveData();
  };

  //
  //    Editing functions
  //

  const setLogToEdit = (l: Log) => setLTE(l);
  const editLog = (log: Log) => {
    setDBLogs([
      ...DBLogs.map((m) => {
        if (m.name === log.date.slice(0, 7))
          m[log.type] = m[log.type].map((l) => {
            if (l.id === log.id) {
              return log;
            }
            return l;
          });
        return m;
      }),
    ]);
    saveData();
  };

  const setCategoryToEdit = (category: Category) => setCTE(category);
  const editCategory = (
    category: Category,
    renamedSubCats: [string, string][],
    removedSubCats: string[]
  ) => {
    const subCatsToRename = renamedSubCats.filter(
      (r) => !removedSubCats.includes(r[0])
    );

    // Adjust subcats accordingly to update category
    let subCats = category.subCats.filter((s) => !removedSubCats.includes(s));
    subCats = subCats.map((s) => {
      const index = subCatsToRename.findIndex((subCat) => subCat[0] === s);
      if (index >= 0) {
        // if the subCat is to be renamed, return new version
        return subCatsToRename[index][1];
      }
      return s;
    });

    setCategories({
      ...categories,
      [category.type]: categories[category.type].map((c) => {
        if (c.name === categoryToEdit!.name)
          return {
            name: category.name,
            type: category.type,
            subCats,
          };
        return c;
      }),
    });

    // Adjust logs
    setDBLogs([
      ...DBLogs.map((m) => {
        return {
          ...m,
          [category.type]: m[category.type].map((l) => {
            if (l.category.name === categoryToEdit!.name) {
              let subCat = l.category.subCat;
              if (subCat) {
                // remove subcat
                if (removedSubCats.includes(subCat))
                  return { ...l, category: { name: category.name } };

                // rename subcat
                const index = subCatsToRename.findIndex((s) => s[0] === subCat);
                if (index >= 0) {
                  subCat = subCatsToRename[index][1];
                }

                return { ...l, category: { name: category.name, subCat } };
              }
              return { ...l, category: { name: category.name } };
            }
            return l;
          }),
        };
      }),
    ]);
    setCTE(undefined);
    saveData();
  };

  const setDebtToEdit = (debt: Debt) => setDTE(debt);
  const editDebt = (debt: Debt) => {
    debts[debt.type] = debts[debt.type].map((d) => {
      if (d.id === debt.id) return debt;
      return d;
    });
    setDebts({ ...debts });
    saveData();
    setDTE(undefined);
  };

  //
  //    Deleting functions
  //

  const deleteLog = (log: Log) => {
    setDBLogs([
      ...DBLogs.map((m) => {
        if (m.name === log.date.slice(0, 7))
          m[log.type] = m[log.type].filter((l) => l !== log);
        return m;
      }),
    ]);
    saveData();
  };
  const deleteCat = (category: Category, t: LogType) => {
    categories[t] = categories[t].filter((c) => c !== category);
    setCategories({ ...categories });
    saveData();
  };
  const deleteDebt = (debt: Debt) => {
    debts[debt.type] = debts[debt.type].filter((d) => d !== debt);
    setDebts({ ...debts });
    saveData();
  };

  const updateSettings = (currentSettings: Settings) => {
    setSavedSettings(currentSettings);
    saveSettings(currentSettings);
  };
  // update current data when mock data setting is changed (switch between saved and mock)
  useEffect(() => {
    const d = getData();
    setDebts(d.debts);
    setDBLogs(d.DBLogs);
    setCategories(d.categories);
  }, [savedSettings[2]]);

  const context = {
    categories,
    DBLogs,
    debts,
    addLog,
    addCategory,
    addDebt,
    setLogToEdit,
    logToEdit,
    editLog,
    setCategoryToEdit,
    categoryToEdit,
    editCategory,
    setDebtToEdit,
    debtToEdit,
    editDebt,
    deleteLog,
    deleteCat,
    deleteDebt,
    savedSettings,
    updateSettings,
    currencySymbol: currencySymbols[savedSettings[1]],
    defaultLogType: logTypes[savedSettings[2]],
    earliestMonth: DBLogs.reduce(
      (earliestMonth, curMonth) =>
        earliestMonth < newDate(curMonth.name)
          ? earliestMonth
          : newDate(curMonth.name),
      new Date()
    ),
  };
  return <Data.Provider value={context}>{props.children}</Data.Provider>;
};

export default Data;
