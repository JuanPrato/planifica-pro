import { IonButton, IonPopover, IonContent, IonIcon, IonList, IonItem, useIonRouter } from '@ionic/react';
import { accessibility, ellipsisHorizontalOutline } from 'ionicons/icons';

import "./activity-options.component.css";
import { useDayStore } from '../store/day.store';
import { Activity } from '../types';

interface Props {
  activity: Activity;
}

function ActivityOptions({ activity }: Props) {

  const addActivity = useDayStore((state) => state.addActivity);
  const router = useIonRouter();

  function markAsComplete() {
    const act: Activity = { ...activity, completed: true, timeUsed: activity.time };
    addActivity(act);
    router.goBack();
  }

  return (
    <>
      <IonButton id="activity-options">
        <IonIcon icon={ellipsisHorizontalOutline} />
      </IonButton>
      <IonPopover trigger="activity-options" triggerAction="click">
        <IonContent className='ion-no-padding options-content'>
          <IonList className='options-list'>
            <IonItem button onClick={markAsComplete}>Marcar como completada</IonItem>
          </IonList>
        </IonContent>
      </IonPopover>
    </>
  )
}

export default ActivityOptions;