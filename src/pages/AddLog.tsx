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
import { useContext, useRef, useState } from "react";

import CurrencyIcon from "../components/CurrencyIcon";
import SubmitButton from "../components/SubmitButton";
import Desc from "../components/text_styles/Desc";
import Data from "../context/DataContext";

import { filterInput } from "../components/global";

const AddLog: React.FC = () => {
  const addLog = useContext(Data).addLog;
  const categories = useContext(Data).categories;
  const defaultLogType = useContext(Data).defaultLogType;

  const amountRef = useRef<HTMLIonInputElement>(null);

  const today = new Date().toISOString().substring(0, 10);
  const [date, setDate] = useState(today);
  const [type, setType] = useState<LogType>(defaultLogType);
  const [cat, setCat] = useState<LogCategory>({
    name: "Uncategorised",
  });
  const [amount, setAmount] = useState<string>("");
  const [note, setNote] = useState("");

  const router = useIonRouter();

  const createLog = () => {
    // Convert selection of type to valid LogType
    let a = +(+amount).toFixed(2);
    if (type === "income") {
      a = Math.abs(a);
    } else if (type === "expense") {
      a = -Math.abs(a);
    }
    addLog({
      id: Date.now(),
      type,
      category: cat,
      amount: a,
      date,
      note: note.trim(),
    });
    setAmount("");
    setNote("");
  };

  const changeAmount = (text: string) => {
    setAmount(text);
    amountRef.current!.value = text;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle> Add a new log</IonTitle>
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
                    value={type}
                    fill="outline"
                    onIonChange={(e) => {
                      setType(e.target.value);
                      setCat({ name: "Uncategorised" });
                    }}
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
                    value={cat}
                    fill="outline"
                    onIonChange={(e) => setCat(e.target.value)}
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
                    {categories[type].map((cat, indexC) => {
                      if (cat.subCats.length === 0)
                        return (
                          <IonSelectOption
                            key={indexC}
                            value={{ name: cat.name }}
                          >
                            {cat.name}
                          </IonSelectOption>
                        );
                      else
                        return (
                          <div key={indexC}>
                            <IonSelectOption value={{ name: cat.name }}>
                              {cat.name}
                            </IonSelectOption>
                            {cat.subCats.map((subCat, indexS) => {
                              return (
                                <IonSelectOption
                                  value={{ name: cat.name, subCat }}
                                  key={`${indexC} ${indexS}`}
                                >
                                  {cat.name} &gt; {subCat}
                                </IonSelectOption>
                              );
                            })}
                          </div>
                        );
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
                      changeAmount(filterInput(e.detail.value!, "numbers"))
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
                    value={date}
                    fill="outline"
                    onIonChange={(e) => setDate(e.detail.value!)}
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
                    onIonChange={(e) => setNote(e.detail.value!)}
                    maxlength={150}
                    autoGrow={true}
                    counter={true}
                    fill="outline"
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <SubmitButton
                    color="secondary"
                    disabled={+amount === 0 || isNaN(+amount)}
                    onClick={createLog}
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

export default AddLog;
