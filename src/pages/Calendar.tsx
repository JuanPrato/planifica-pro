import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';

import './Calendar.css';
import { chevronBackOutline, chevronForwardOutline, starOutline } from 'ionicons/icons';

const CalendarPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Calendario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Primera pestaña</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRow className='calendar-header ion-justify-content-around ion-align-items-center'>
          <IonButton fill='clear' color="dark">
            <IonIcon aria-hidden="true" icon={chevronBackOutline} />
          </IonButton>
          <IonText>Semana del 11 de diciembre</IonText>
          <IonButton fill='clear' color="dark">
            <IonIcon aria-hidden="true" icon={chevronForwardOutline} />
          </IonButton>
        </IonRow>
        <IonList lines='full'>
          <IonItem button>
            <IonGrid>
              <IonRow className="ion-align-items-center">
                <IonCol className='date' size='2'>
                  <strong>Jueves</strong>
                  <strong>11</strong>
                  <small>dic</small>
                </IonCol>
                <IonCol className='duties'>
                  <IonLabel>
                    <h1><strong>4 tareas</strong></h1>
                    <h2>0h 46m</h2>
                  </IonLabel>
                </IonCol>
                <IonCol size='1'>
                  <IonIcon aria-hidden="true" icon={starOutline} />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default CalendarPage;
