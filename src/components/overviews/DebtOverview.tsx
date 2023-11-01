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
import Desc from "../text_styles/Desc";

import { useAlert } from "../global";

const DebtOverview: React.FC<{ debt: Debt | undefined; close: () => void }> = (
  props
) => {
  const deleteDebt = useContext(Data).deleteDebt;
  const setDebtToEdit = useContext(Data).setDebtToEdit;
  const showAlert = useAlert();

  const router = useIonRouter();

  const removeDebt = () => {
    showAlert("Are you sure you want do delete this debt?", () => {
      deleteDebt(props.debt!);
      props.close();
    });
  };
  const changeDebt = () => {
    setDebtToEdit(props.debt!);
    props.close();
    router.push("Edit-debt");
  };
  return (
    <>
      <IonCard className="overview">
        <IonCardHeader>
          <IonTitle color="dark">Debt overview</IonTitle>
        </IonCardHeader>
        <IonCardContent>
          {props.debt !== undefined && (
            <IonList>
              <IonItem>
                <Desc>Name:</Desc>&nbsp;{props.debt.name}
              </IonItem>
              <IonItem>
                <Desc>Amount:</Desc>&nbsp;{props.debt.amount.toFixed(2)}
              </IonItem>
              <IonItem>
                <Desc>Date:</Desc>&nbsp;
                {props.debt.date === undefined
                  ? "---"
                  : `${props.debt.date.slice(-2)}-${props.debt.date.slice(
                      5,
                      7
                    )}-${props.debt.date.slice(0, 4)}`}
              </IonItem>
              <IonItem>
                <Desc>Until:</Desc>&nbsp;
                {props.debt.until === undefined
                  ? "---"
                  : `${props.debt.until.slice(-2)}-${props.debt.until.slice(
                      5,
                      7
                    )}-${props.debt.until.slice(0, 4)}`}
              </IonItem>
              <IonItem>
                <Desc>Created on:</Desc>&nbsp;
                {new Date(props.debt.id).getDate()}-
                {`0${new Date(props.debt.id).getMonth() + 1}`.slice(-2)}-
                {new Date(props.debt.id).getFullYear()}
              </IonItem>
              <IonItem>
                <Desc>Note:</Desc>&nbsp;
                {props.debt.note.length > 0 ? props.debt.note : "---"}
              </IonItem>
            </IonList>
          )}
        </IonCardContent>
        <div className="footer">
          <IonButton
            className="form-button-right"
            color="secondary"
            onClick={changeDebt}
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
            onClick={removeDebt}
          >
            Delete
          </IonButton>
        </div>
      </IonCard>
    </>
  );
};

export default DebtOverview;
