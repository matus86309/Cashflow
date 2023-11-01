import {
  IonBackdrop,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useContext, useState } from "react";

import { add } from "ionicons/icons";

import Data from "../context/DataContext";
import DebtOverview from "../components/overviews/DebtOverview";
import DebtItem from "../components/items/DebtItem";

const LnB: React.FC = () => {
  const debts = useContext(Data).debts;

  const [type, setType] = useState<string>("Lent");
  const [viewedDebt, setViewedDebt] = useState<Debt | undefined>(undefined);
  const [search, setSearch] = useState("");

  const router = useIonRouter();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Lent & borrowed</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonSegment
              value={type}
              onIonChange={(e) =>
                setType(
                  typeof e.detail.value !== "number" ? e.detail.value! : "lent"
                )
              }
            >
              <IonSegmentButton value="Lent">I lent</IonSegmentButton>
              <IonSegmentButton value="Borrowed">I borrowed</IonSegmentButton>
            </IonSegment>
          </IonCardHeader>
          <IonCardContent>
            <IonSearchbar
              className="searchbar"
              value={search}
              onIonInput={(e) => setSearch(e.detail.value!)}
            />
            <IonGrid>
              <IonRow className="ion-text-center" style={{ padding: "0 12px" }}>
                <IonCol size="6" sizeMd="3">
                  Amount
                </IonCol>
                <IonCol size="6" sizeMd="3">
                  Name
                </IonCol>
                <IonCol sizeMd="3" className="ion-hide-md-down">
                  Date
                </IonCol>
                <IonCol sizeMd="3" className="ion-hide-md-down">
                  Until
                </IonCol>
              </IonRow>
              {type === "Lent"
                ? debts.lent.map(
                    (d, index) =>
                      (search.length === 0 || d.name?.includes(search)) && (
                        <DebtItem
                          debt={d}
                          key={index}
                          onClick={() => setViewedDebt(d)}
                        />
                      )
                  )
                : debts.borrowed.map(
                    (d, index) =>
                      (search.length === 0 || d.name?.includes(search)) && (
                        <DebtItem
                          debt={d}
                          key={index}
                          onClick={() => setViewedDebt(d)}
                        />
                      )
                  )}
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>

      {viewedDebt === undefined ? (
        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton
            color="secondary"
            onClick={() => router.push("/Add-debt")}
          >
            <IonIcon src={add} />
          </IonFabButton>
        </IonFab>
      ) : (
        <div>
          <IonBackdrop />
          <DebtOverview
            debt={viewedDebt}
            close={() => setViewedDebt(undefined)}
          />
        </div>
      )}
    </IonPage>
  );
};

export default LnB;
