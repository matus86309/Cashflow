import { IonCol, IonIcon, IonInput, IonRow } from "@ionic/react";
import { useRef } from "react";

import { remove } from "ionicons/icons";

import { filterInput } from "../global";

const NewSubCatItem: React.FC<{
  subCat: string;
  setSubCat: (text: string) => void;
  onRemove: () => void;
  currentSubCats: string[];
}> = (props) => {
  const subCatRef = useRef<HTMLIonInputElement>(null);

  const isDuplicate =
    props.currentSubCats.filter((s) => s === subCatRef.current?.value).length >
    1;

  const changeSubCat = (text: string) => {
    props.setSubCat(text);
    subCatRef.current!.value = text;
  };
  return (
    <IonRow>
      <IonCol sizeXs="11" sizeSm="6" sizeMd="5" sizeLg="4">
        <IonInput
          value={props.subCat}
          className={`input ${isDuplicate && "ion-invalid ion-touched"}`}
          placeholder="Subcategory name"
          onIonInput={(e) =>
            changeSubCat(filterInput(e.detail.value!, "alfanumerics"))
          }
          errorText="Duplicate name"
          ref={subCatRef}
        />
      </IonCol>
      <IonCol size="1">
        <IonIcon
          src={remove}
          color="tertiary"
          style={{ marginTop: "2.5vh" }}
          onClick={props.onRemove}
        />
      </IonCol>
    </IonRow>
  );
};

export default NewSubCatItem;
