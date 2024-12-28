import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './profile.page.css';
import { useUserStore } from '../store/user.store';


const ProfilePage: React.FC = () => {

  const { user, logIn } = useUserStore((state) => state);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonTitle>Configuración</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonCard color="secondary">
            <IonCardHeader>
              <IonCardTitle>Perfil</IonCardTitle>
              <IonCardSubtitle>Gestión del perfil de usuario</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              {
                user === null && (
                  <IonButton onClick={logIn}>INICIAR SESIÓN</IonButton>
                )
              }
              {
                user && (
                  <IonItem color="secondary">
                    <IonAvatar slot='start'>
                      <img src={user!.photoUrl || ""} alt='Foto de perfil' />
                    </IonAvatar>
                    <IonLabel>{user.displayName}</IonLabel>
                  </IonItem>
                )
              }
            </IonCardContent>
          </IonCard>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
