import { IonButton, useIonRouter } from "@ionic/react";

const AddLogButton: React.FC = () => {
  const router = useIonRouter();
  return (
    <div className="space-filler content-center">
      <div>
        <span>No logs in the selected period</span>
        <br />
        <IonButton
          color="tertiary"
          fill="clear"
          onClick={() => router.push("/add-log")}
        >
          Add logs
        </IonButton>
      </div>
    </div>
  );
};

export default AddLogButton;
