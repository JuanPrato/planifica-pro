import { IonButton, IonPopover, IonContent, IonIcon, IonList, IonItem } from '@ionic/react';
import { ellipsisHorizontalOutline } from 'ionicons/icons';

import "./activity-options.component.css";

function ActivityOptions() {
  return (
    <>
      <IonButton id="activity-options">
        <IonIcon icon={ellipsisHorizontalOutline} />
      </IonButton>
      <IonPopover trigger="activity-options" triggerAction="click">
        <IonContent className='ion-no-padding options-content'>
          <IonList className='options-list'>
            <IonItem button>Marcar como completada</IonItem>
          </IonList>
        </IonContent>
      </IonPopover>
    </>
  )
}

export default ActivityOptions;