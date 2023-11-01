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
import { useContext, useEffect, useRef, useState } from "react";

import { add } from "ionicons/icons";

import SubmitButton from "../components/SubmitButton";
import NewSubCatItem from "../components/items/NewSubCatItem";
import SubCatItem from "../components/items/SubCatItem";
import Gray from "../components/text_styles/Gray";
import Data from "../context/DataContext";

import { filterInput } from "../components/global";

const EditCategory: React.FC = () => {
  const editCategory = useContext(Data).editCategory;
  const ogCategory = useContext(Data).categoryToEdit;
  const categories = useContext(Data).categories;

  const [category, setCategory] = useState<Category>();
  const [newSubCats, setNewSubCats] = useState<string[]>([]);
  const [removedSubCats, setRemovedSubCats] = useState<string[]>([]);
  const [renamedSubCats, setRenamedSubCats] = useState<[string, string][]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nameRef = useRef<HTMLIonInputElement>(null);

  const router = useIonRouter();

  useEffect(() => {
    if (ogCategory !== undefined) setCategory(ogCategory);
    else if (
      router.routeInfo.pathname === "/Edit-category" ||
      router.routeInfo.pathname === "/Edit-category/"
    )
      router.push("/");
  }, [router.routeInfo.pathname]);

  // Fallback, only here to make the code work without !, should not be visible ever
  if (category === undefined) return <p>Invalid request</p>;

  // used for checking for duplicate names
  const currentSubCats = [...category.subCats, ...newSubCats]
    .filter((s) => !removedSubCats.includes(s))
    .map((s) => {
      const index = renamedSubCats.findIndex((sub) => sub[0] === s);
      if (index >= 0) return renamedSubCats[index][1];
      return s;
    });
  /* check how many times this category name is this name used
     in current state of categories, (there is 1 if the name was not changed) */
  const isNameDuplicate =
    categories[category.type]
      .map((c) => c.name)
      .filter((n) => n === category.name).length >
      (category.name === ogCategory?.name ? 1 : 0) && !isSubmitted;

  const changeCategory = () => {
    // this prevents the name input from lighting up after saving
    setIsSubmitted(true);

    editCategory(
      {
        name: category.name.trim(),
        type: category.type,
        subCats: [
          ...category.subCats,
          ...newSubCats.map((s) => s.trim()).filter((s) => s !== ""),
        ],
      },
      renamedSubCats.filter((r) => r[1] !== ""),
      removedSubCats
    );
    close();
  };

  const close = () => {
    setNewSubCats([]);
    setRenamedSubCats([]);
    setRemovedSubCats([]);
    router.goBack();
  };

  const changeName = (text: string) => {
    setCategory({ ...category, name: text });
    nameRef.current!.value = text;
  };

  const renameSubCat = (ogName: string, newName: string) => {
    const index = renamedSubCats.findIndex((s) => s[0] === ogName);
    if (index >= 0) {
      // if the name is different, change it
      if (ogName !== newName) renamedSubCats[index][1] = newName;
      // if the name is the same, remove it from renamed array
      else {
        setRenamedSubCats([
          ...renamedSubCats.slice(0, index),
          ...renamedSubCats.slice(index + 1, renamedSubCats.length),
        ]);
        return;
      }
    } else renamedSubCats.push([ogName, newName]);
    setRenamedSubCats([...renamedSubCats]);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Edit category</IonTitle>
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
                    value={category.name}
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
                {category.subCats.map((s, index) => (
                  <SubCatItem
                    ogSubCat={s}
                    onRemove={() => setRemovedSubCats([...removedSubCats, s])}
                    rename={(newName) => renameSubCat(s, newName)}
                    currentSubCats={currentSubCats}
                    key={index}
                  />
                ))}
                <IonRow>
                  <IonCol style={{ marginTop: "3vh" }}>
                    <Gray>
                      <h2>New subcategories</h2>
                    </Gray>
                  </IonCol>
                </IonRow>
                {newSubCats.map((s, index) => (
                  <NewSubCatItem
                    subCat={s}
                    setSubCat={(text) => {
                      newSubCats[index] = text;
                      setNewSubCats([...newSubCats]);
                    }}
                    onRemove={() => {
                      setNewSubCats([
                        ...newSubCats.slice(0, index),
                        ...newSubCats.slice(index + 1, newSubCats.length),
                      ]);
                    }}
                    currentSubCats={currentSubCats}
                    key={index}
                  />
                ))}
                <IonRow>
                  <IonButton
                    color="tertiary"
                    fill="clear"
                    onClick={() => {
                      setNewSubCats([...newSubCats, ""]);
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
                      onClick={changeCategory}
                      disabled={
                        category.name.trim().length === 0 ||
                        isNameDuplicate ||
                        new Set(currentSubCats).size !== currentSubCats.length
                      }
                    >
                      Save
                    </SubmitButton>
                    <IonButton
                      className="form-button-right"
                      fill="clear"
                      onClick={close}
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

export default EditCategory;
