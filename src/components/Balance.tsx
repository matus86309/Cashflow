import { useContext } from "react";

import Data from "../context/DataContext";
import Gray from "./text_styles/Gray";
import Green from "./text_styles/Green";
import Red from "./text_styles/Red";

const Balance: React.FC<{
  balance: number;
  className?: string;
}> = (props) => {
  const currencySymbol = useContext(Data).currencySymbol;
  return props.balance > 0 ? (
    <Green className={props.className}>
      +{props.balance.toFixed(2) + currencySymbol}
    </Green>
  ) : props.balance === 0 ? (
    <Gray className={props.className}>
      {props.balance.toFixed(2) + currencySymbol}
    </Gray>
  ) : (
    <Red className={props.className}>
      {props.balance.toFixed(2) + currencySymbol}
    </Red>
  );
};

export default Balance;
