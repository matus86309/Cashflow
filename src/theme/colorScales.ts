export const colorScaleDefault = [
  "#FF0000", //(red)
  "#FFB400", //(orange)
  "#13338D", //(blue)
  "#89ae09", //(light green)
  "#920C0D", //(dark red)
  "#DD5E98", //(pink)
  "#004FFF", //(blue)
  "#802880", //(purple)
  "#92660D", //(olive green)
  "#a6a6a6", //(gray)
];

export const colorScaleGray = [
  "#1b1c1d",
  "#333536",
  "#4b4d4f",
  "#5f6164",
  "#737679",
  "#8b8e91",
  "#a0a3a5",
  "#b5b7b9",
  "#ced0d1",
  "#e3e4e5",
];

const colors = {
  red: {
    h: 1,
    s: "81%",
    l: 20,
  },
  green: {
    h: 116,
    s: "81%",
    l: 10,
  },
  yellow: {
    h: 60,
    s: "81%",
    l: 20
  },
  gray:{
    h: 0,
    s: "0%",
    l: 20
  }
};
export const generateColorScale = (
  n: number,
  color: "red" | "green" | "yellow" | "gray"
): string[] => {
  const colorScale = [];
  const limit = n > 9 ? 11 : n + 1;
  const col = colors[color];
  for (let i = 1; i < limit; i++) {
    colorScale.push(`hsl(${col.h}, ${col.s}, ${col.l + (63 / limit) * i}%)`);
  }
  return colorScale;
};
