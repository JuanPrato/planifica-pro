import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { fromKey } from '../util/time.util';
import { useDayStore } from '../store/day.store';

import "./activity.page.css";
import Timer from '../components/timer.component';
import { createOutline, playOutline, refreshOutline } from 'ionicons/icons';
import ActivityTimerCard from '../components/activity-timer-card.component';
import ActivityDetailsCard from '../components/activity-details-card.component';
import NewNoteModal from '../components/new-note-modal.component';
import ActivityNoteCard from '../components/activity-notes-card.component';

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
      <IonContent fixedSlotPlacement="before">
        <IonItem lines='none'>
          <ActivityTimerCard activity={activity} />
        </IonItem>
        <IonItem lines="none">
          <ActivityDetailsCard activity={activity} />
        </IonItem>
        <IonItem lines='none'>
          <ActivityNoteCard />
        </IonItem>
        <IonFab horizontal="end" vertical="bottom" slot="fixed">
          <IonFabButton color="secondary" id="open-modal-note">
            <IonIcon icon={createOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
        <NewNoteModal />
      </IonContent>
    </IonPage>
  )
}

export default ActivityPage;