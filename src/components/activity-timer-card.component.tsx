import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonToggle, IonRow, IonChip } from '@ionic/react';
import { playOutline, refreshOutline } from 'ionicons/icons';
import React from 'react'
import Timer from './timer.component';
import { Activity } from '../types';

import "./activity-timer-card.component.css";
import { useDayStore } from '../store/day.store';

interface Props {
  activity: Activity;
}

const ActivityTimerCard = ({ activity }: Props) => {

  const addActivity = useDayStore((state) => state.addActivity);

  function onStop(completed: boolean, timeUsed: number) {
    activity.timeUsed = timeUsed;
    activity.completed = completed;

    addActivity(activity);
  }

  return (
    <IonCard color="secondary">
      <IonCardHeader>
        <IonCardTitle>Temporizador</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div className='content-container'>
          <Timer
            initialData={{ totalTime: activity.time, timeUsed: activity.timeUsed, forward: !activity.maxTime }}
            onStop={onStop}
          />
        </div>
      </IonCardContent>
    </IonCard>
  )
}

export default ActivityTimerCard;