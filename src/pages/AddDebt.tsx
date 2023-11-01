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
import { useContext, useRef, useState } from "react";

import CurrencyIcon from "../components/CurrencyIcon";
import SubmitButton from "../components/SubmitButton";
import Desc from "../components/text_styles/Desc";
import Red from "../components/text_styles/Red";
import Data from "../context/DataContext";

import { filterInput } from "../components/global";

const AddDebt: React.FC = () => {
  const addDebt = useContext(Data).addDebt;

  const [type, setType] = useState<DebtType>("lent");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<string | undefined>(undefined);
  const [until, setUntil] = useState<string | undefined>(undefined);
  const [note, setNote] = useState("");

  const nameRef = useRef<HTMLIonInputElement>(null);
  const amountRef = useRef<HTMLIonInputElement>(null);
  const noteRef = useRef<HTMLIonTextareaElement>(null);

  const router = useIonRouter();

  const createDebt = () => {
    addDebt({
      id: Date.now(),
      type,
      name,
      amount: Math.abs(+amount),
      date,
      until,
      note,
    });

    setAmount("");
    setName("");
  };

  const changeName = (text: string) => {
    setName(text);
    nameRef.current!.value = text;
  };
  const changeAmount = (text: string) => {
    setAmount(text);
    amountRef.current!.value = text;
  };
  const changeNote = (text: string) => {
    setNote(text);
    noteRef.current!.value = text;
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Add a new debt</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonSegment
              value={type}
              onIonChange={(e) =>
                setType(e.detail.value === "lent" ? "lent" : "borrowed")
              }
            >
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
                  {type === "lent" ? "To:" : "From:"}
                  <Red>*</Red>
                  <IonInput
                    className="input"
                    placeholder="Name"
                    value={name}
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
                    value={date}
                    fill="outline"
                    onIonChange={(e) => setDate(e.detail.value!)}
                  />
                </IonCol>
                <IonCol sizeMd="3" sizeSm="6" sizeXs="12">
                  Until:
                  <IonInput
                    type="date"
                    className="input"
                    value={until}
                    fill="outline"
                    onIonChange={(e) => setUntil(e.detail.value!)}
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <Desc>Note</Desc>
                  <IonTextarea
                    placeholder="Additional information"
                    className="textarea"
                    value={note}
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
                      +amount === 0 || isNaN(+amount) || name.length === 0
                    }
                    onClick={createDebt}
                  >
                    Add
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

export default AddDebt;
