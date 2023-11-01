import {
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  useIonRouter,
} from "@ionic/react";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

import { add } from "ionicons/icons";

const ActionFab: React.FC<{ route: "Income" | "Expenses" | "Mixed" }> = (
  props
) => {
  const fabRef = useRef<HTMLIonFabElement | null>();
  const path = useLocation().pathname;
  const router = useIonRouter();

  useEffect(() => {
    fabRef.current && fabRef.current.close();
  }, [path]);

  return (
    <IonFab
      slot="fixed"
      horizontal="start"
      vertical="bottom"
      ref={(ref) => (fabRef.current = ref)}
    >
      <IonFabButton color="secondary">
        <IonIcon src={add} />
      </IonFabButton>
      <IonFabList side="top">
        <div className="fab-option-wrapper">
          <div
            className="fab-option fab-option-border"
            onClick={() => router.push(`/${props.route}/Add-category`)}
          >
            Add Category
          </div>
          <div
            className="fab-option"
            onClick={() => router.push(`/${props.route}/Regular-income`)}
          >
            Regular&nbsp;income
          </div>
        </div>
      </IonFabList>
    </IonFab>
  );
};

export default ActionFab;
