import { IonIcon } from "@ionic/react";
import { useContext } from "react";

import { logoEuro, logoUsd, logoYen } from "ionicons/icons";

import Data from "../context/DataContext";

const CurrencyIcon: React.FC = (props) => {
  const option = useContext(Data).savedSettings[1];
  return (
    <IonIcon
      src={option === 0 ? logoEuro : option === 1 ? logoUsd : logoYen}
      className="input-icon"
      slot="end"
    />
  );
};

export default CurrencyIcon;
