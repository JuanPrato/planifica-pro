import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ProfileCard from '../components/settings/profile-card.component';

import './settings.page.css';

const SettingsPage: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonTitle>Configuración</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ProfileCard />
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
