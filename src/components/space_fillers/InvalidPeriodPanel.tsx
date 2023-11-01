import { IonTitle } from "@ionic/react";

import Gray from "../text_styles/Gray";

const InvalidPeriodPanel: React.FC<{
  type: "chart" | "chart-long" | "logs";
}> = (props) => {
  return (
    <div className="space-filler content-center">
      <div>
        <IonTitle color="dark">Invalid period</IonTitle>
        <br />
        {props.type === "chart" || props.type === "chart-long" ? (
          <>
            {props.type === "chart" ? (
              <Gray>The period should not be longer than 1 year</Gray>
            ) : (
              <Gray> The period should not be longer than 5 years</Gray>
            )}
            <br />
            <Gray>or shorter than 3 months</Gray>
          </>
        ) : (
          <Gray>The period should not be longer than 2 years</Gray>
        )}
        <Gray>
          {" "}
          and the date <b>From</b> should be before the date <b>To</b>
        </Gray>
      </div>
    </div>
  );
};

export default InvalidPeriodPanel;
