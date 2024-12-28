import { IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonAvatar, IonLabel, IonButton } from '@ionic/react';
import { useUserStore } from '../../store/user.store';

import "./profile-card.component.css";

function ProfileCard() {

  const { user, logIn, logOut } = useUserStore((state) => state);

  return (
    <IonItem lines='none'>
      <IonCard color="secondary">
        <IonCardHeader>
          <IonCardTitle>Perfil</IonCardTitle>
          <IonCardSubtitle>Gestión del perfil de usuario</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonList lines='none' className='profile-items'>
            {
              user && (
                <IonItem color="secondary" className='profile-item-detail'>
                  <IonAvatar slot='start'>
                    <img src={user!.photoUrl || ""} alt='Foto de perfil' />
                  </IonAvatar>
                  <IonLabel>
                    <h2>{user.displayName}</h2>
                    <p className='profile-email'>{user.email}</p>
                  </IonLabel>
                </IonItem>
              )
            }
            {
              user === null ? (
                <IonButton
                  onClick={logIn}
                  color="primary"
                  expand='block'
                >
                  INICIAR SESIÓN
                </IonButton>
              ) : (
                <IonButton
                  onClick={logOut}
                  color="danger"
                  expand="block">
                  CERRAR SESIÓN
                </IonButton>
              )
            }
          </IonList>
        </IonCardContent>
      </IonCard>
    </IonItem>
  )
}

export default ProfileCard;