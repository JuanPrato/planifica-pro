import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ProfileCard from '../components/settings/profile-card.component';

import './settings.page.css';
import { useUserStore } from '../store/user.store';

const SettingsPage: React.FC = () => {

  const { getTokenId, validateUser } = useUserStore((state) => state);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonTitle>Configuración</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ProfileCard />
        <IonButton onClick={() => { }} >FETCH</IonButton>
        <IonButton onClick={validateUser} >VALIDATE</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
