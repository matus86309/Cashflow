export const mockData = (() => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  // monthNames starting with current, decreasing with increasing index
  const monthNames = [];

  for (let i = 0; i < 6; i++) {
    let month = currentMonth - i;
    let year = currentYear;
    if (month < 1) {
      month += 12;
      year--;
    }
    monthNames.push(year + "-" + ("0" + month).slice(-2));
  }

  return {
    DBLogs: [
      {
        name: monthNames[0],
        income: [
          {
            id: 1696779763045,
            type: "income",
            category: {
              name: "Work",
              subCat: "Salary",
            },
            amount: 900,
            date: monthNames[0] + "-01",
            note: "",
          },
          {
            id: 1696773394137,
            type: "income",
            category: {
              name: "Uncategorised",
            },
            amount: 15.88,
            date: monthNames[0] + "-05",
            note: "Found on the ground",
          },
          {
            id: 1696773394136,
            type: "income",
            category: {
              name: "Work",
              subCat: "Tips",
            },
            amount: 124.9,
            date: monthNames[0] + "-01",
            note: "",
          },
        ],
        expense: [
          {
            id: 1696774327271,
            type: "expense",
            category: {
              name: "Streaming platforms",
              subCat: "Netflix",
            },
            amount: -12.89,
            date: monthNames[0] + "-15",
            note: "",
          },
          {
            id: 1696775123745,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Lidl",
            },
            amount: -30.07,
            date: monthNames[0] + "-03",
            note: "",
          },
          {
            id: 1696775138039,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Lidl",
            },
            amount: -88.14,
            date: monthNames[0] + "-09",
            note: "",
          },
          {
            id: 1696775284820,
            type: "expense",
            category: {
              name: "Clothes",
              subCat: "Shoes",
            },
            amount: -210.99,
            date: monthNames[0] + "-08",
            note: "",
          },
        ],
        mixed: [
          {
            id: 1696775607139,
            type: "mixed",
            category: {
              name: "Investing",
              subCat: "Amazon",
            },
            amount: 450,
            date: monthNames[0] + "-05",
            note: "",
          },
        ],
      },
      {
        name: monthNames[1],
        income: [
          {
            id: 1696772777211,
            type: "income",
            category: {
              name: "Work",
              subCat: "Salary",
            },
            amount: 1030,
            date: monthNames[1] + "-01",
            note: "",
          },
          {
            id: 1696773412421,
            type: "income",
            category: {
              name: "Work",
              subCat: "Tips",
            },
            amount: 90,
            date: monthNames[1] + "-01",
            note: "",
          },
        ],
        expense: [
          {
            id: 1696774319003,
            type: "expense",
            category: {
              name: "Streaming platforms",
              subCat: "Netflix",
            },
            amount: -12.89,
            date: monthNames[1] + "-15",
            note: "",
          },
          {
            id: 1696774390720,
            type: "expense",
            category: {
              name: "Streaming platforms",
              subCat: "Prime video",
            },
            amount: -7.99,
            date: monthNames[1] + "-18",
            note: "",
          },
          {
            id: 1696775025513,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Albert Heijn",
            },
            amount: -31.62,
            date: monthNames[1] + "-02",
            note: "",
          },
          {
            id: 1696775037635,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Albert Heijn",
            },
            amount: -52.21,
            date: monthNames[1] + "-05",
            note: "",
          },
          {
            id: 1696775052105,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Lidl",
            },
            amount: -34.63,
            date: monthNames[1] + "-09",
            note: "",
          },
          {
            id: 1696775065686,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Lidl",
            },
            amount: -13.57,
            date: monthNames[1] + "-13",
            note: "",
          },
          {
            id: 1696775075206,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Lidl",
            },
            amount: -7.99,
            date: monthNames[1] + "-16",
            note: "",
          },
          {
            id: 1696775083227,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Lidl",
            },
            amount: -34.95,
            date: monthNames[1] + "-18",
            note: "",
          },
          {
            id: 1696775091363,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Lidl",
            },
            amount: -14.83,
            date: monthNames[1] + "-23",
            note: "",
          },
          {
            id: 1696775100105,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Lidl",
            },
            amount: -13,
            date: monthNames[1] + "-27",
            note: "",
          },
          {
            id: 1696775109256,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Lidl",
            },
            amount: -25.43,
            date: monthNames[1] + "-30",
            note: "",
          },
        ],
        mixed: [
          {
            id: 1696775575817,
            type: "mixed",
            category: {
              name: "Investing",
              subCat: "Apple.inc",
            },
            amount: -220,
            date: monthNames[1] + "-02",
            note: "",
          },
        ],
      },
      {
        name: monthNames[2],
        income: [
          {
            id: 1696772787915,
            type: "income",
            category: {
              name: "Work",
              subCat: "Salary",
            },
            amount: 900,
            date: monthNames[2] + "-01",
            note: "",
          },
          {
            id: 1696773424619,
            type: "income",
            category: {
              name: "Work",
              subCat: "Tips",
            },
            amount: 200,
            date: monthNames[2] + "-01",
            note: "",
          },
          {
            id: 1696773780545,
            type: "income",
            category: {
              name: "Gifts",
            },
            amount: 250,
            date: monthNames[2] + "-25",
            note: "Mom & dad",
          },
          {
            id: 1696773828232,
            type: "income",
            category: {
              name: "Gifts",
            },
            amount: 20,
            date: monthNames[2] + "-25",
            note: "Aunt Claire",
          },
        ],
        expense: [
          {
            id: 1696774259434,
            type: "expense",
            category: {
              name: "Streaming platforms",
              subCat: "Disney+",
            },
            amount: -10.99,
            date: monthNames[2] + "-08",
            note: "",
          },
          {
            id: 1696774308591,
            type: "expense",
            category: {
              name: "Streaming platforms",
              subCat: "Netflix",
            },
            amount: -12.89,
            date: monthNames[2] + "-15",
            note: "",
          },
          {
            id: 1696774382470,
            type: "expense",
            category: {
              name: "Streaming platforms",
              subCat: "Prime video",
            },
            amount: -7.99,
            date: monthNames[2] + "-18",
            note: "",
          },
          {
            id: 1696774970954,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Albert Heijn",
            },
            amount: -89.43,
            date: monthNames[2] + "-15",
            note: "",
          },
          {
            id: 1696774978371,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Albert Heijn",
            },
            amount: -45.98,
            date: monthNames[2] + "-09",
            note: "",
          },
          {
            id: 1696774988539,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Albert Heijn",
            },
            amount: -23.84,
            date: monthNames[2] + "-04",
            note: "",
          },
          {
            id: 1696775001673,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Albert Heijn",
            },
            amount: -34.25,
            date: monthNames[2] + "-21",
            note: "",
          },
          {
            id: 1696775010858,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Albert Heijn",
            },
            amount: -22.98,
            date: monthNames[2] + "-29",
            note: "",
          },
          {
            id: 1696775296623,
            type: "expense",
            category: {
              name: "Clothes",
              subCat: "Shoes",
            },
            amount: -130.87,
            date: monthNames[2] + "-23",
            note: "",
          },
        ],
        mixed: [
          {
            id: 1696775526445,
            type: "mixed",
            category: {
              name: "Investing",
              subCat: "S&P500",
            },
            amount: 500,
            date: monthNames[2] + "-21",
            note: "",
          },
          {
            id: 1696775546467,
            type: "mixed",
            category: {
              name: "Investing",
              subCat: "S&P500",
            },
            amount: -530,
            date: monthNames[2] + "-08",
            note: "",
          },
        ],
      },
      {
        name: monthNames[3],
        income: [
          {
            id: 1696772799973,
            type: "income",
            category: {
              name: "Work",
              subCat: "Salary",
            },
            amount: 950,
            date: monthNames[3] + "-01",
            note: "",
          },
          {
            id: 1696773586093,
            type: "income",
            category: {
              name: "Work",
              subCat: "Tips",
            },
            amount: 123.8,
            date: monthNames[3] + "-01",
            note: "",
          },
        ],
        expense: [
          {
            id: 1696774269738,
            type: "expense",
            category: {
              name: "Streaming platforms",
              subCat: "Disney+",
            },
            amount: -10.99,
            date: monthNames[3] + "-08",
            note: "",
          },
          {
            id: 1696774373689,
            type: "expense",
            category: {
              name: "Streaming platforms",
              subCat: "Prime video",
            },
            amount: -7.99,
            date: monthNames[3] + "-18",
            note: "",
          },
          {
            id: 1696774748437,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Lidl",
            },
            amount: -43.76,
            date: monthNames[3] + "-04",
            note: "",
          },
          {
            id: 1696774795662,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Lidl",
            },
            amount: -55.8,
            date: monthNames[3] + "-11",
            note: "",
          },
          {
            id: 1696774803526,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Lidl",
            },
            amount: -7.9,
            date: monthNames[3] + "-17",
            note: "",
          },
          {
            id: 1696774812379,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Lidl",
            },
            amount: -12.53,
            date: monthNames[3] + "-16",
            note: "",
          },
          {
            id: 1696774826693,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Lidl",
            },
            amount: -67.87,
            date: monthNames[3] + "-25",
            note: "",
          },
        ],
        mixed: [
          {
            id: 1696775591833,
            type: "mixed",
            category: {
              name: "Investing",
              subCat: "Amazon",
            },
            amount: -350,
            date: monthNames[3] + "-04",
            note: "",
          },
        ],
      },
      {
        name: monthNames[4],
        income: [
          {
            id: 1696772823750,
            type: "income",
            category: {
              name: "Work",
              subCat: "Salary",
            },
            amount: 830,
            date: monthNames[4] + "-01",
            note: "",
          },
          {
            id: 1696773441845,
            type: "income",
            category: {
              name: "Work",
              subCat: "Tips",
            },
            amount: 170,
            date: monthNames[4] + "-01",
            note: "",
          },
        ],
        expense: [
          {
            id: 1696774280654,
            type: "expense",
            category: {
              name: "Streaming platforms",
              subCat: "Disney+",
            },
            amount: -10.99,
            date: monthNames[4] + "-08",
            note: "",
          },
          {
            id: 1696774366359,
            type: "expense",
            category: {
              name: "Streaming platforms",
              subCat: "Prime video",
            },
            amount: -7.99,
            date: monthNames[4] + "-18",
            note: "",
          },
          {
            id: 1696774667290,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Lidl",
            },
            amount: -12.89,
            date: monthNames[4] + "-01",
            note: "",
          },
          {
            id: 1696774677361,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Lidl",
            },
            amount: -33.67,
            date: monthNames[4] + "-06",
            note: "",
          },
          {
            id: 1696774685462,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Lidl",
            },
            amount: -55.9,
            date: monthNames[4] + "-12",
            note: "",
          },
          {
            id: 1696774703140,
            type: "expense",
            category: {
              name: "Groceries",
            },
            amount: -120.78,
            date: monthNames[4] + "-21",
            note: "",
          },
          {
            id: 1696774721402,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Albert Heijn",
            },
            amount: -67.91,
            date: monthNames[4] + "-30",
            note: "",
          },
        ],
        mixed: [],
      },
      {
        name: monthNames[5],
        income: [
          {
            id: 1696772837426,
            type: "income",
            category: {
              name: "Work",
              subCat: "Salary",
            },
            amount: 230,
            date: monthNames[5] + "-01",
            note: "",
          },
          {
            id: 1696773460949,
            type: "income",
            category: {
              name: "Work",
              subCat: "Tips",
            },
            amount: 59.3,
            date: monthNames[5] + "-01",
            note: "",
          },
        ],
        expense: [
          {
            id: 1696774358074,
            type: "expense",
            category: {
              name: "Streaming platforms",
              subCat: "Prime video",
            },
            amount: -7.99,
            date: monthNames[5] + "-18",
            note: "",
          },
          {
            id: 1696774594153,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Lidl",
            },
            amount: -34.56,
            date: monthNames[5] + "-13",
            note: "",
          },
          {
            id: 1696774611005,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Lidl",
            },
            amount: -67.89,
            date: monthNames[5] + "-18",
            note: "",
          },
          {
            id: 1696774621087,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Lidl",
            },
            amount: -22.86,
            date: monthNames[5] + "-22",
            note: "",
          },
          {
            id: 1696774646290,
            type: "expense",
            category: {
              name: "Groceries",
              subCat: "Albert Heijn",
            },
            amount: -23.67,
            date: monthNames[5] + "-29",
            note: "",
          },
        ],
        mixed: [],
      },
    ],
    categories: {
      income: [
        {
          name: "Work",
          type: "income",
          subCats: ["Salary", "Tips"],
        },
        {
          name: "Gifts",
          type: "income",
          subCats: [],
        },
      ],
      expense: [
        {
          name: "Groceries",
          type: "expense",
          subCats: ["Lidl", "Albert Heijn"],
        },
        {
          name: "Clothes",
          type: "expense",
          subCats: ["Shoes"],
        },
        {
          name: "Streaming platforms",
          type: "expense",
          subCats: ["Netflix", "Disney+", "Prime video"],
        },
      ],
      mixed: [
        {
          name: "Investing",
          type: "mixed",
          subCats: ["Apple.inc", "S&P500", "Amazon"],
        },
      ],
    },
    debts: {
      lent: [
        {
          amount: 10,
          date: monthNames[2] + "-12",
          id: 1701778988843,
          name: "Thomas",
          note: "Dinner",
          type: "lent",
          until: undefined,
        },
        {
          amount: 15,
          date: monthNames[0] + "-14",
          id: 1701779071849,
          name: "Sofia",
          note: "Train",
          type: "lent",
          until: undefined,
        },
      ],
      borrowed: [
        {
          amount: 25000,
          date: "2022-09-01",
          id: 1701781321506,
          name: "Student Loan",
          note: "",
          type: "borrowed",
          until: "2032-10-01",
        },
        {
          amount: 12.6,
          date: monthNames[1] + "-28",
          id: 1701781341218,
          name: "Bruno",
          note: "Cinema",
          type: "borrowed",
          until: undefined,
        },
      ],
    },
  };
})();
