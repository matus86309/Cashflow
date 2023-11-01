import "./CustomItem.css";

import { IonCol, IonRow } from "@ionic/react";

import Balance from "../Balance";

const SubcategoryItem: React.FC<{
  children: (JSX.Element | string) | (JSX.Element | string)[];
  className: string;
  onClick: () => void;
  balance: number;
}> = (props) => {
  return (
    <IonRow
      className={`custom-item large ${props.className}`}
      onClick={props.onClick}
    >
      <IonCol size="8.5" className="content-center">
        {props.children}
      </IonCol>
      <IonCol size="3.5" className="content-center">
        {<Balance balance={props.balance!} className="slot-right" />}
      </IonCol>
    </IonRow>
  );
};

export default SubcategoryItem;
