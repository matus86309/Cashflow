import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonToggle,
} from "@ionic/react";

const SettingItem: React.FC<{
  title: string;
  subTitle: string;
  options?: Array<string>;
  value: any;
  setValue: (value: any) => void;
}> = (props) => {
  if (props.options)
    return (
      <IonRow>
        <IonCol>
          <IonCard>
            <IonRow>
              <IonCol sizeXs="9.5" sizeSm="10" sizeMd="10.5" sizeLg="11">
                <IonCardHeader>
                  <IonText color="dark">{props.title}</IonText>
                </IonCardHeader>
                <IonCardContent>{props.subTitle}</IonCardContent>
              </IonCol>
              <IonCol
                sizeXs="2.5"
                sizeSm="2"
                sizeMd="1.5"
                sizeLg="1"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IonSelect
                  className="setting-select"
                  style={{
                    fontSize:
                      props.options[props.value].length < 2 ? "1.5em" : ".9em",
                    width: props.options[props.value].length + 3 + "em",
                  }}
                  value={props.value}
                  onIonChange={(e) => props.setValue(e.detail.value)}
                >
                  {props.options.map((option, index) => (
                    <IonSelectOption value={index} key={index}>
                      <b>{option}</b>
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonCol>
            </IonRow>
          </IonCard>
        </IonCol>
      </IonRow>
    );
  else
    return (
      <IonRow>
        <IonCol>
          <IonCard>
            <IonRow>
              <IonCol sizeXs="9.5" sizeSm="10" sizeMd="10.5" sizeLg="11">
                <IonCardHeader>
                  <IonText color="dark">{props.title}</IonText>
                </IonCardHeader>
                <IonCardContent>{props.subTitle}</IonCardContent>
              </IonCol>
              <IonCol
                sizeXs="2.5"
                sizeSm="2"
                sizeMd="1.5"
                sizeLg="1"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IonToggle
                  checked={props.value}
                  onIonChange={(e) => props.setValue(e.detail.checked)}
                />
              </IonCol>
            </IonRow>
          </IonCard>
        </IonCol>
      </IonRow>
    );
};

export default SettingItem;
