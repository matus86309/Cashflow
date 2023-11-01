import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";

const RegularIncome: React.FC = (props) => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Regular income</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader className="ion-text-center">
            <IonTitle>This feature is not ready yet</IonTitle>
          </IonCardHeader>
          <IonCardContent className="content-center" style={{ height: "70vh" }}>
            <div>
              Regular income will be a part of the next feature bundle <br />
              <IonButton
                fill="clear"
                routerDirection="back"
                onClick={() =>
                  router.canGoBack() ? router.goBack() : router.push("/Home")
                }
              >
                Go back
              </IonButton>
            </div>{" "}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default RegularIncome;
