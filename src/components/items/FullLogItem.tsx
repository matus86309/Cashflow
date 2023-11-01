import { IonCol, IonRow } from "@ionic/react";

import Balance from "../Balance";
import Red from "../text_styles/Red";
import Yellow from "../text_styles/Yellow";
import Green from "../text_styles/Green";

const FullLogItem: React.FC<{
  log: Log;
  type: LogType;
  onClick?: () => void;
}> = (props) => {
  return (
    <div className="custom-item" onClick={props.onClick}>
      <IonRow>
        <IonCol size="2" className="content-center">
          {props.type === "income" ? (
            <Green>inc</Green>
          ) : props.type === "expense" ? (
            <Red>exp</Red>
          ) : (
            <Yellow>mix</Yellow>
          )}
        </IonCol>
        <IonCol size="7" className="content-center">
          {props.log.category.name}
          {props.log.category.subCat !== undefined &&
            ` > ${props.log.category.subCat}`}
        </IonCol>
        <IonCol size="3" className="content-center">{<Balance balance={props.log.amount} />}</IonCol>
      </IonRow>
    </div>
  );
};

export default FullLogItem;
