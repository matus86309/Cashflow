import { IonButton, IonIcon } from "@ionic/react";
import { useState } from "react";

import { checkmark } from "ionicons/icons";

const SubmitButton: React.FC<{
  children?: string;
  color: string;
  disabled: Boolean;
  onClick: () => void;
}> = (props) => {
  const [wasClicked, setWasClicked] = useState(false);

  const onClick = () => {
    if (wasClicked === false) {
      props.onClick();
      setWasClicked(true);
      setTimeout(() => setWasClicked(false), 1500);
    }
  };
  return (
    <IonButton
      color={wasClicked ? "success" : props.color}
      className="form-button-right"
      disabled={props.disabled && !wasClicked}
      onClick={onClick}
    >
      {!wasClicked ? props.children : <IonIcon src={checkmark} />}
    </IonButton>
  );
};

export default SubmitButton;
