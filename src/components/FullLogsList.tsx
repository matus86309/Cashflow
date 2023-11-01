import { useContext } from "react";

import Data from "../context/DataContext";
import DateLine from "./DateLine";
import FullLogItem from "./items/FullLogItem";
import AddLogButton from "./space_fillers/AddLogButton";

import { getLogsFromPeriod } from "./global";

const FullLogsList: React.FC<{
  period: Period;
  setViewedLog: React.Dispatch<React.SetStateAction<Log | undefined>>;
}> = (props) => {
  const DBLogs = useContext(Data).DBLogs;
  const logs = getLogsFromPeriod(DBLogs, props.period, "all");

  // create ordered divisions of logs based on date
  const logsDivisions: Day[] = [];
  for (let i = 0; logs[i]; i++) {
    const curDate = logs[i].date;
    if (logsDivisions.find((c) => c.date === curDate) === undefined) {
      logsDivisions.push({
        date: curDate,
        logs: [],
      });
    }
    logsDivisions.find((d) => d.date === curDate)!.logs.push(logs[i]);
  }

  if (logsDivisions.length === 0) return <AddLogButton />;

  return (
    <>
      {logsDivisions
        .map((d) => ({
          ...d,
          date:
            d.date.substring(0, 4) +
            d.date.substring(5, 7) +
            d.date.substring(8, 10),
        }))
        .sort((a, b) => +b.date - +a.date)
        .map((d, indexD) => (
          <div key={indexD}>
            <DateLine date={`${d.date}`} />
            {d.logs.map((l, indexL) => (
              <FullLogItem
                log={l}
                type={l.type}
                onClick={() => props.setViewedLog && props.setViewedLog(l)}
                key={indexL}
              ></FullLogItem>
            ))}
          </div>
        ))}
    </>
  );
};

export default FullLogsList;
