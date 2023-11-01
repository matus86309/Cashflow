import { IonCol, IonIcon, IonInput, IonRow } from "@ionic/react";
import { useRef, useState } from "react";

import { close, remove } from "ionicons/icons";

import { filterInput } from "../global";

const SubCatItem: React.FC<{
  ogSubCat: string;
  rename: (text: string) => void;
  onRemove: () => void;
  currentSubCats: string[];
}> = (props) => {
  const [removed, setRemoved] = useState(false);
  const [subCat, setSubCat] = useState(props.ogSubCat);

  const subCatRef = useRef<HTMLIonInputElement>(null);

  const isDuplicate =
    props.currentSubCats.filter((s) => s === subCat).length > 1 && !removed;

  const changeSubCat = (text: string) => {
    props.rename(text);
    setSubCat(text);
    subCatRef.current!.value = text;
  };
  return (
    <IonRow>
      <IonCol sizeXs="11" sizeSm="6" sizeMd="5" sizeLg="4">
        <IonInput
          value={subCat}
          className={`input ${isDuplicate && "ion-invalid ion-touched"}`}
          placeholder="Subcategory name"
          onIonInput={(e) =>
            changeSubCat(filterInput(e.detail.value!, "alfanumerics"))
          }
          ref={subCatRef}
          errorText="Duplicate name"
          disabled={removed}
        />
      </IonCol>
      <IonCol size="1">
        <IonIcon
          src={removed ? close : remove}
          color="tertiary"
          style={{ marginTop: "2.5vh" }}
          onClick={() => {
            setRemoved(!removed);
            props.onRemove();
          }}
        />
      </IonCol>
    </IonRow>
  );
};

export default SubCatItem;
