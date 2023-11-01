import { IonIcon, IonLabel } from "@ionic/react";

import { water } from "ionicons/icons";

import Balance from "../Balance";

const LegendItem: React.FC<{
  item: {
    name: string;
    balance: number;
    color: string;
  };
  selected: Boolean;
  onClick: () => void;
}> = (props) => {
  return (
    <div
      className={`custom-item legend ${props.selected && "selected"}`}
      onClick={props.onClick}
    >
      <IonIcon src={water} style={{ color: props.item.color }} />
      <IonLabel className="transparent">{props.item.name}</IonLabel>
      <IonLabel className="transparent slot-right">
        <Balance balance={props.item.balance} />
      </IonLabel>
    </div>
  );
};

export default LegendItem;
