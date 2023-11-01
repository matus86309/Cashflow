import "./Overview.css";

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonItem,
  IonList,
  IonTitle,
  useIonRouter,
} from "@ionic/react";
import { useContext } from "react";

import Data from "../../context/DataContext";
import Balance from "../Balance";
import Desc from "../text_styles/Desc";

import { useAlert } from "../global";

const LogOverview: React.FC<{ log: Log | undefined; close: () => void }> = (
  props
) => {
  const router = useIonRouter();
  const deleteLog = useContext(Data).deleteLog;
  const setLogToEdit = useContext(Data).setLogToEdit;
  const showAlert = useAlert();
  const removeLog = () => {
    showAlert("Are you sure you want to delete this log?", () => {
      deleteLog(props.log!);
      props.close();
    });
  };
  const changeLog = () => {
    setLogToEdit(props.log!);
    props.close();
    router.push("/Edit-log");
  }
  return (
    <>
      <IonCard className="overview">
        <IonCardHeader>
          <IonTitle color="dark">Log overview</IonTitle>
        </IonCardHeader>
        <IonCardContent>
          {props.log !== undefined && (
            <IonList>
              <IonItem>
                <Desc>Category:</Desc>&nbsp;{props.log.category.name}
                {props.log.category.subCat !== undefined &&
                  ` > ${props.log.category.subCat}`}
              </IonItem>
              <IonItem>
                <Desc>Amount:</Desc>&nbsp;
                <Balance balance={props.log.amount} />
              </IonItem>
              <IonItem>
                <Desc>Date:</Desc>&nbsp;{props.log.date.slice(-2)}-
                {props.log.date.slice(5, 7)}-{props.log.date.slice(0, 4)}
              </IonItem>
              <IonItem>
                <Desc>Created on:</Desc>&nbsp;{new Date(props.log.id).getDate()}
                -{`0${new Date(props.log.id).getMonth() + 1}`.slice(-2)}-
                {new Date(props.log.id).getFullYear()}
              </IonItem>
              <IonItem>
                <Desc>Note:</Desc>&nbsp;
                {props.log.note.length > 0 ? props.log.note : "---"}
              </IonItem>
            </IonList>
          )}
        </IonCardContent>
        <div className="footer">
          <IonButton
            className="form-button-right"
            color="secondary"
            onClick={changeLog}
          >
            edit
          </IonButton>
          <IonButton
            className="form-button-right"
            color="secondary"
            fill="clear"
            onClick={props.close}
          >
            close
          </IonButton>
          <IonButton
            className="form-button-left"
            color="danger"
            onClick={removeLog}
          >
            Delete
          </IonButton>
        </div>
      </IonCard>
    </>
  );
};

export default LogOverview;
