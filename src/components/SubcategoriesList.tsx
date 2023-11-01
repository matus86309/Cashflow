import { IonCardContent } from "@ionic/react";

import SubcategoryItem from "./items/SubcategoryItem";
import AddCategoryButton from "./space_fillers/AddCategoryButton";

const SubcategoriesList: React.FC<{
  data: { name: string; balance: number }[];
  onCatClick: (name: string) => void;
  selectedCats: string[];
}> = (props) => {
  if (props.data.length === 0) return <AddCategoryButton />;
  return (
    <IonCardContent>
      {props.data.map((cur, index) => {
        return (
          <SubcategoryItem
            className={
              props.selectedCats.find((n) => n === cur.name) !== undefined
                ? "selected"
                : ""
            }
            onClick={() => props.onCatClick(cur.name)}
            balance={cur.balance}
            key={index}
          >
            {cur.name}
          </SubcategoryItem>
        );
      })}
    </IonCardContent>
  );
};

export default SubcategoriesList;
