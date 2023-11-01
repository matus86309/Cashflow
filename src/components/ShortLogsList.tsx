import DateLine from "./DateLine";
import ShortLogItem from "./items/ShortLogItem";
import AddLogButton from "./space_fillers/AddLogButton";

const ShortLogsList: React.FC<{
  logs: Log[];
  setViewedLog: React.Dispatch<React.SetStateAction<Log | undefined>>;
  selectedCats?: string[];
  selectedSubcats?: string[];
}> = (props) => {
  if (props.logs.length > 0) {
    const sortData = (): Day[] => {
      let logs = props.logs;

      // filter displayed logs based on selected categories
      if (props.selectedCats !== undefined && props.selectedCats.length > 0) {
        logs = props.selectedCats
          .map((c) => logs.filter((l) => l.category.name === c))
          .flat();
      }
      // filter displayed logs based on selected subcategories
      if (
        props.selectedSubcats !== undefined &&
        props.selectedSubcats.length > 0
      ) {
        logs = props.selectedSubcats
          .map((s) => logs.filter((l) => l.category.subCat === s))
          .flat();
      }

      // divide logs in divisions based on date
      const logsDivisions: Day[] = [];
      for (let i = 0; logs[i]; i++) {
        const curDate = logs[i].date;
        if (logsDivisions.find((c) => c.date === curDate) === undefined) {
          logsDivisions.push({
            date: curDate,
            logs: [],
          });
        }
        logsDivisions.find((c) => c.date === curDate)!.logs.push(logs[i]);
      }
      return logsDivisions
        .map((d) => ({
          ...d,
          date:
            d.date.substring(0, 4) +
            d.date.substring(5, 7) +
            d.date.substring(8, 10),
        }))
        .sort((a, b) => +b.date - +a.date);
    };

    const data = sortData();

    if (data.length === 0) return <AddLogButton />;

    return (
      <>
        {data.map((d, indexD) => {
          return (
            <div key={indexD}>
              <DateLine date={`${d.date}`} />
              {d.logs.map((l, indexL) => (
                <ShortLogItem
                  onClick={() => props.setViewedLog && props.setViewedLog(l)}
                  balance={l.amount}
                  key={indexL}
                >
                  {l.category.subCat === undefined
                    ? l.category.name
                    : `${l.category.name} > ${l.category.subCat}`}
                </ShortLogItem>
              ))}
            </div>
          );
        })}
      </>
    );
  } else {
    return <AddLogButton />;
  }
};

export default ShortLogsList;
