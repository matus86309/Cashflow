import "./CustomItem.css";

import { IonCol, IonRow } from "@ionic/react";

import Balance from "../Balance";

const ShortLogItem: React.FC<{
  children: (JSX.Element | string) | (JSX.Element | string)[];
  onClick: () => void;
  balance: number;
}> = (props) => {
  return (
    <IonRow className="custom-item" onClick={props.onClick}>
      <IonCol size="9" sizeLg="10" className="content-center">
        {props.children}
      </IonCol>
      <IonCol size="3" sizeLg="2" className="content-center">
        {<Balance balance={props.balance!} className="slot-right" />}
      </IonCol>
    </IonRow>
  );
};

export default ShortLogItem;
