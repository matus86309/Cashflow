import { IonIcon } from "@ionic/react";

import { chevronDown } from "ionicons/icons";

const DTRowButton: React.FC<{onClick: () => void; isOpen: Boolean}> = (props) => {
  return (
    <IonIcon
      src={chevronDown}
      color={props.isOpen ? "" : "medium"}
      style={{
        position: "absolute",
        top: "2.75vh",
        right: "3vh",
        transform: props.isOpen ? "rotate(180deg)" : "",
      }}
      onClick={props.onClick}
    />
  );
};

export default DTRowButton;
