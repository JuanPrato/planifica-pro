import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { fromKey } from '../util/time.util';
import { useDayStore } from '../store/day.store';

interface Params { date: string, activityId: string };

const ActivityPage: React.FC<RouteComponentProps<Params>> = ({ match, history }) => {

  const day = fromKey(match.params.date);
  const data = useDayStore((state) => state.getDayData(day));
  if (!data) {
    history.goBack();
    return;
  }

  const activity = data.activities.filter(a => a.id === Number(match.params.activityId)).at(0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='secondary'>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{activity?.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

      </IonContent>
    </IonPage>
  )
}

export default ActivityPage;