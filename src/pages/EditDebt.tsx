import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useContext, useEffect, useRef, useState } from "react";

import CurrencyIcon from "../components/CurrencyIcon";
import SubmitButton from "../components/SubmitButton";
import Desc from "../components/text_styles/Desc";
import Red from "../components/text_styles/Red";
import Data from "../context/DataContext";

import { filterInput } from "../components/global";

const EditDebt: React.FC = () => {
  const editDebt = useContext(Data).editDebt;
  const ogDebt = useContext(Data).debtToEdit;
  const [debt, setDebt] = useState<Debt>();

  const nameRef = useRef<HTMLIonInputElement>(null);
  const amountRef = useRef<HTMLIonInputElement>(null);
  const noteRef = useRef<HTMLIonTextareaElement>(null);

  const [amount, setAmount] = useState("");
  const router = useIonRouter();

  useEffect(() => {
    if (ogDebt !== undefined) {
      setDebt(ogDebt);
    }
    if (
      ogDebt === undefined &&
      (router.routeInfo.pathname === "/Edit-debt" ||
        router.routeInfo.pathname === "/Edit-debt")
    )
      router.push("/LnB");
  }, [router.routeInfo.pathname]);

  // Fallback, only here to make the code work without !, should not be visible ever
  if (debt === undefined) return <p>invalid request</p>;

  const saveDebt = () => {
    editDebt({ ...debt, amount: +amount });
  };

  const changeName = (text: string) => {
    setDebt({ ...debt, name: text });
    nameRef.current!.value = text;
  };
  const changeAmount = (text: string) => {
    setAmount(text);
    amountRef.current!.value = text;
  };
  const changeNote = (text: string) => {
    setDebt({
      ...debt,
      note: text,
    })
    noteRef.current!.value = text;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Edit debt</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonSegment value={debt.type} disabled>
              <IonSegmentButton value="lent">
                <IonLabel>I lent</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="borrowed">
                <IonLabel>I borrowed</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol sizeMd="3" sizeSm="6" sizeXs="12">
                  {debt.type === "lent" ? "To:" : "From:"}
                  <Red>*</Red>
                  <IonInput
                    className="input"
                    placeholder="Name"
                    value={debt.name}
                    fill="outline"
                    onIonInput={(e) =>
                      changeName(filterInput(e.detail.value!, "alfanumerics"))
                    }
                    ref={nameRef}
                  />
                </IonCol>
                <IonCol sizeMd="3" sizeSm="6" sizeXs="12">
                  Amount:<Red>*</Red>
                  <IonInput
                    className="input"
                    placeholder="0.00"
                    value={amount}
                    fill="outline"
                    onIonInput={(e) =>
                      changeAmount(filterInput(e.detail.value!, "numbers"))
                    }
                    ref={amountRef}
                  >
                    <CurrencyIcon />
                  </IonInput>
                </IonCol>
                <IonCol sizeMd="3" sizeSm="6" sizeXs="12">
                  When:
                  <IonInput
                    type="date"
                    className="input"
                    value={debt.date}
                    fill="outline"
                    onIonChange={(e) =>
                      setDebt({
                        ...debt,
                        date: filterInput(e.detail.value!, "alfanumerics"),
                      })
                    }
                  />
                </IonCol>
                <IonCol sizeMd="3" sizeSm="6" sizeXs="12">
                  Until:
                  <IonInput
                    type="date"
                    className="input"
                    value={debt.until}
                    fill="outline"
                    onIonChange={(e) =>
                      setDebt({ ...debt, until: e.detail.value! })
                    }
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <Desc>Note</Desc>
                  <IonTextarea
                    placeholder="Additional information"
                    className="textarea"
                    value={debt.note}
                    onIonInput={(e) =>
                      changeNote(filterInput(e.detail.value!, "alfanumerics"))
                    }
                    maxlength={150}
                    autoGrow={true}
                    counter={true}
                    fill="outline"
                    ref={noteRef}
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <Red>*</Red> required fields
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <SubmitButton
                    color="secondary"
                    disabled={
                      +debt.amount === 0 ||
                      isNaN(+debt.amount) ||
                      debt.name.length === 0
                    }
                    onClick={saveDebt}
                  >
                    Save
                  </SubmitButton>
                  <IonButton
                    className="form-button-right"
                    color="tertiary"
                    fill="clear"
                    onClick={() => router.goBack()}
                  >
                    close
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default EditDebt;
