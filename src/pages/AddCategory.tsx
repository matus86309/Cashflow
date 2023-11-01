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
  IonIcon,
  IonInput,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useContext, useRef, useState } from "react";
import { useParams } from "react-router";

import { add } from "ionicons/icons";

import NewSubCatItem from "../components/items/NewSubCatItem";
import SubmitButton from "../components/SubmitButton";
import Data from "../context/DataContext";

import { filterInput, toLogType } from "../components/global";


const AddCategory: React.FC = () => {
  const addCategory = useContext(Data).addCategory;
  const categories = useContext(Data).categories;

  const [name, setName] = useState("");
  const [subCats, setSubCats] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const params = useParams<{ lType: string }>();
  const router = useIonRouter();

  // Convert params to valid LogType
  const lType = toLogType(params.lType);

  const nameRef = useRef<HTMLIonInputElement>(null);

  const isNameDuplicate =
    categories[lType].map((c) => c.name).filter((n) => n === name).length > 0 &&
    !isSubmitted;

  const createCat = () => {
    addCategory({
      name: name.trim(),
      type: lType,
      subCats: subCats.map((s) => s.trim()),
    });
    setName("");
    setSubCats([]);
  };

  const changeName = (text: string) => {
    // this prevents the name input from lighting up after saving
    setIsSubmitted(true);

    setName(text);
    nameRef.current!.value = text;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Add category</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonCard>
            <IonCardHeader>
              <IonRow>
                <IonCol sizeXs="12" sizeSm="6" sizeMd="5" sizeLg="4">
                  <IonInput
                    placeholder="Category name"
                    className={`input ${
                      isNameDuplicate && "ion-invalid ion-touched"
                    }`}
                    fill="outline"
                    value={name}
                    onIonInput={(e) =>
                      changeName(filterInput(e.detail.value!, "alfanumerics"))
                    }
                    errorText="This name is already in use"
                    ref={nameRef}
                  />
                </IonCol>
              </IonRow>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid>
                {subCats.map((s, index) => (
                  <NewSubCatItem
                    subCat={s}
                    setSubCat={(text) => {
                      subCats[index] = text;
                      setSubCats([...subCats]);
                    }}
                    onRemove={() => {
                      setSubCats([
                        ...subCats.slice(0, index),
                        ...subCats.slice(index + 1, subCats.length),
                      ]);
                    }}
                    currentSubCats={subCats}
                    key={index}
                  />
                ))}
                <IonRow>
                  <IonButton
                    color="tertiary"
                    fill="clear"
                    onClick={() => {
                      setSubCats([...subCats, ""]);
                    }}
                  >
                    <IonIcon src={add} slot="start" />
                    Add subcategory
                  </IonButton>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <SubmitButton
                      color="secondary"
                      onClick={createCat}
                      disabled={
                        name.trim().length === 0 ||
                        isNameDuplicate ||
                        new Set(subCats).size !== subCats.length
                      }
                    >
                      Create
                    </SubmitButton>
                    <IonButton
                      className="form-button-right"
                      fill="clear"
                      onClick={() => router.push(`/${params.lType}`)}
                    >
                      close
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AddCategory;
