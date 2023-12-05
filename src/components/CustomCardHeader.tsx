import { IonIcon, IonText, useIonRouter } from "@ionic/react";

import { chevronBack } from "ionicons/icons";

const CustomCardHeader: React.FC<{
  link?: string;
  children: (JSX.Element | string) | (JSX.Element | string)[] ;
}> = (props) => {
  const router = useIonRouter();
  return (
    <div style={{ margin: "2vh 3vh 0"}} className="content-center">
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
          fontSize: "1.25em",
        }}
        color="dark"
        mode="md"
      >
        {props.children}
      </IonText>
    </div>
  );
};

export default CustomCardHeader;
