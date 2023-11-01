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
  IonMenuButton,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useContext, useEffect, useRef, useState } from "react";

import CurrencyIcon from "../components/CurrencyIcon";
import SubmitButton from "../components/SubmitButton";
import Desc from "../components/text_styles/Desc";
import Data from "../context/DataContext";

import { filterInput } from "../components/global";

const EditLog: React.FC = () => {
  const editLog = useContext(Data).editLog;
  const ogLog = useContext(Data).logToEdit;
  const categories = useContext(Data).categories;

  const [log, setLog] = useState<Log>();
  const [amount, setAmount] = useState("");

  const amountRef = useRef<HTMLIonInputElement>(null);
  const noteRef = useRef<HTMLIonTextareaElement>(null);

  const router = useIonRouter();

  useEffect(() => {
    if (ogLog !== undefined) {
      setLog(ogLog);
      setAmount(`${ogLog.amount}`);
    }
    if (
      ogLog === undefined &&
      (router.routeInfo.pathname === "/Edit-log" ||
        router.routeInfo.pathname === "/Edit-log/")
    )
      router.push("/");
  }, [router.routeInfo.pathname]);

  // Fallback, only here to make the code work without !, should not be visible ever
  if (log === undefined) return <p>invalid request</p>;

  const saveLog = () => {
    // Convert selection of type to valid LogType
    let a = +(+amount).toFixed(2);
    if (log.type === "income") {
      a = Math.abs(a);
    } else if (log.type === "expense") {
      a = -Math.abs(a);
    }
    editLog({ ...log, amount: a });
  };

  const changeAmount = (text: string) => {
    setAmount(text);
    amountRef.current!.value = text;
  };

  const changeNote = (text: string) => {
    setLog({ ...log, note: text });
    noteRef.current!.value = text;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle> Edit log</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader></IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol sizeMd="3" sizeSm="6" sizeXs="12">
                  Type
                  <IonSelect
                    className="input"
                    value={log.type}
                    fill="outline"
                    disabled
                  >
                    <IonSelectOption value="income">Income</IonSelectOption>
                    <IonSelectOption value="expense">Expense</IonSelectOption>
                    <IonSelectOption value="mixed">Mixed</IonSelectOption>
                  </IonSelect>
                </IonCol>
                <IonCol sizeMd="3" sizeSm="6" sizeXs="12">
                  Category
                  <IonSelect
                    className="input"
                    value={log.category}
                    fill="outline"
                    onIonChange={(e) =>
                      setLog({ ...log, category: e.target.value })
                    }
                    compareWith={(o1: LogCategory, o2: LogCategory) => {
                      // this function ensures correct select behavior, namely ensures correct display of selected value
                      if (!o1.subCat && !o2.subCat) {
                        return o1.name === o2.name;
                      } else if (o1.subCat && o2.subCat) {
                        return o1.name === o2.name && o1.subCat === o2.subCat;
                      } else return false;
                    }}
                  >
                    <IonSelectOption value={{ name: "Uncategorised" }}>
                      Uncategorised
                    </IonSelectOption>
                    {categories[log.type].map((cat, index) => {
                      if (cat.subCats.length === 0)
                        return (
                          <IonSelectOption
                            key={index}
                            value={{ name: cat.name }}
                          >
                            {cat.name}
                          </IonSelectOption>
                        );
                      else
                        return cat.subCats.map((subCat, index) => {
                          return (
                            <IonSelectOption
                              value={{ name: cat.name, subCat }}
                              key={index}
                            >
                              {cat.name} &gt; {subCat}
                            </IonSelectOption>
                          );
                        });
                    })}
                  </IonSelect>
                </IonCol>
                <IonCol sizeMd="3" sizeSm="6" sizeXs="12">
                  Amount
                  <IonInput
                    className="input"
                    placeholder="0.00"
                    value={amount}
                    fill="outline"
                    onIonInput={(e) =>
                      changeAmount(filterInput(e.detail.value!, "alfanumerics"))
                    }
                    ref={amountRef}
                  >
                    <CurrencyIcon />
                  </IonInput>
                </IonCol>
                <IonCol sizeMd="3" sizeSm="6" sizeXs="12">
                  Date
                  <IonInput
                    type="date"
                    className="input"
                    value={log.date}
                    fill="outline"
                    onIonChange={(e) =>
                      setLog({ ...log, date: e.detail.value! })
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
                    value={log.note}
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
                  <SubmitButton
                    color="secondary"
                    disabled={+log.amount === 0 || isNaN(+log.amount)}
                    onClick={saveLog}
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

export default EditLog;
