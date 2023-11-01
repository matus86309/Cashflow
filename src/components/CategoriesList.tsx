import { IonCardContent, IonIcon, useIonRouter } from "@ionic/react";

import { statsChart } from "ionicons/icons";

import AddCategoryButton from "./space_fillers/AddCategoryButton";
import CategoryItem from "./items/CategoryItem";

const CategoriesList: React.FC<{
  data: { name: string; balance: number }[];
  onCatClick: (name: string) => void;
  selectedCats: string[];
}> = (props) => {
  const router = useIonRouter();
  if (props.data.length === 0) return <AddCategoryButton />;
  return (
    <IonCardContent>
      {props.data.map((cur, index) => {
        return (
          <CategoryItem
            className={
              props.selectedCats.find((n) => n === cur.name) !== undefined
                ? "selected"
                : ""
            }
            onClick={() => props.onCatClick(cur.name)}
            icon={
              <IonIcon
                src={statsChart}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(
                    router.routeInfo.pathname + "/Category/" + cur.name
                  );
                }}
              />
            }
            balance={cur.balance}
            key={index}
          >
            {cur.name}
          </CategoryItem>
        );
      })}
    </IonCardContent>
  );
};

export default CategoriesList;
