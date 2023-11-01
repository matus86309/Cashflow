import { IonButton, useIonRouter } from "@ionic/react";
import { useContext } from "react";

import Data from "../../context/DataContext";

const AddSubCategoryButton: React.FC<{ category: Category }> = (props) => {
  const setCategoryToEdit = useContext(Data).setCategoryToEdit;
  const router = useIonRouter();
  return (
    <div className="space-filler content-center">
      <div>
        <span>No Subategories</span>
        <br />
        <IonButton
          color="tertiary"
          fill="clear"
          onClick={() => {
            setCategoryToEdit(props.category);
            router.push("/Edit-category");
          }}
        >
          Create a subcategory
        </IonButton>
      </div>
    </div>
  );
};

export default AddSubCategoryButton;
