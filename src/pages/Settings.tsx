import {
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useContext, useState } from "react";

import Data from "../context/DataContext";
import SettingItem from "../components/items/SettingItem";

import { currencySymbols, logTypes } from "../components/global";

// when adding a setting, update the defaul value in DataContext.tsx
const settingsList = [
  {
    title: "Dark mode",
    subTitle: "Use dark colors to increase battery lifespan",
  },
  {
    title: "Currency",
    subTitle: "Choose a preferred currency symbol",
    options: currencySymbols,
  },
  {
    title: "Default log type",
    subTitle:
      "The default type displayed on home screen and selected when adding logs",
    options: logTypes,
  },
  {
    title: "Mock data",
    subTitle:
      "Use a premade dataset to showcase app capabilities. Changes made to mock data won't be saved and won't affect saved data",
  },
];

const Settings: React.FC = () => {
  const savedSettings = useContext(Data).savedSettings;
  const updateSettings = useContext(Data).updateSettings;
  const [isChecked, setIsChecked] = useState(savedSettings);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Settings</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          {settingsList.map(({ title, subTitle, options }, index) => (
            <SettingItem
              title={title}
              subTitle={subTitle}
              options={options}
              value={isChecked[index]}
              setValue={(value) => {
                isChecked[index] = value;
                setIsChecked([...isChecked]);
                updateSettings([...isChecked]);
              }}
              key={index}
            />
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
