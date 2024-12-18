import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonHeader, IonIcon, IonItem, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { fromKey } from '../util/time.util';
import { useDayStore } from '../store/day.store';

import "./activity.page.css";
import Timer from '../components/timer.component';
import { playOutline, refreshOutline } from 'ionicons/icons';
import ActivityTimerCard from '../components/activity-timer-card.component';

interface Params { date: string, activityId: string };

const ActivityPage: React.FC<RouteComponentProps<Params>> = ({ match, history }) => {

  const day = fromKey(match.params.date);
  const data = useDayStore((state) => state.getDayData(day));
  if (!data) {
    history.goBack();
    return;
  }

  const activity = data.activities.filter(a => a.id === Number(match.params.activityId)).at(0);

  if (!activity) {
    history.goBack();
    return;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='secondary'>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle >{activity?.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem lines='none'>
          <ActivityTimerCard activity={activity} />
        </IonItem>
      </IonContent>
    </IonPage>
  )
}

export default ActivityPage;