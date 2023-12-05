import "./CustomItem.css";

import { IonCol, IonRow } from "@ionic/react";
import { useContext } from "react";

import Data from "../../context/DataContext";

const DebtItem: React.FC<{
  onClick: () => void;
  debt: Debt;
}> = (props) => {
  const currencySymbol = useContext(Data).currencySymbol;

  return (
    <div className="custom-item large" onClick={props.onClick}>
      <IonRow>
        <IonCol size="6" sizeMd="3" className="content-center">
          {props.debt.amount.toFixed(2) + currencySymbol}
        </IonCol>
        <IonCol size="6" sizeMd="3" className="content-center">
          {props.debt.name}
        </IonCol>
        <IonCol sizeMd="3" className="content-center ion-hide-md-down">
          {props.debt.date === undefined
            ? "---"
            : `${new Date(props.debt.date).toLocaleDateString("default", {
                month: "short",
              })} ` +
              props.debt.date.slice(8, 10) +
              " " +
              props.debt.date.slice(0, 4)}
        </IonCol>
        <IonCol sizeMd="3" className="content-center ion-hide-md-down">
          {props.debt.until === undefined ? "---" : props.debt.until}
        </IonCol>
      </IonRow>
    </div>
  );
};

export default DebtItem;
