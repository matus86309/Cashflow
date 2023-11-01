import { IonIcon, IonText, useIonRouter } from "@ionic/react";

import { chevronBack } from "ionicons/icons";

const CustomCardHeader: React.FC<{
  link?: string;
  children: (JSX.Element | string) | (JSX.Element | string)[] ;
}> = (props) => {
  const router = useIonRouter();
  return (
    <div style={{ margin: "2vh 3vh 0", display: "flex", justifyContent:"center" }}>
      {props.link !== undefined && (
        <IonIcon
          src={chevronBack}
          style={{
            display: "block",
            float: "left",
            fontSize: "1.4em",
            cursor: "pointer",
            marginLeft: "-1vh"
          }}
          color="dark"
          onClick={() => router.push(props.link!)}
        />
      )}

      <IonText
        style={{
          display: "block",
          float: "left",
          fontSize: "1.25em",
        }}
        color="dark"
      >
        {props.children}
      </IonText>
    </div>
  );
};

export default CustomCardHeader;
