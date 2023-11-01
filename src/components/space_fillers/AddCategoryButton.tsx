import { IonButton, useIonRouter } from "@ionic/react";

const AddCategoryButton: React.FC = () => {
  const router = useIonRouter();
  return (
    <div className="space-filler content-center">
      <div>
        <span>No Categories</span>
        <br />
        <IonButton
          color="tertiary"
          fill="clear"
          onClick={() =>
            router.push(router.routeInfo.pathname + "/Add-category")
          }
        >
          Create a category
        </IonButton>
      </div>
    </div>
  );
};

export default AddCategoryButton;
