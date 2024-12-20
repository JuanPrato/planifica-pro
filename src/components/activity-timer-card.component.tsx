import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonToggle, IonRow, IonChip } from '@ionic/react';
import { playOutline, refreshOutline } from 'ionicons/icons';
import React from 'react'
import Timer from './timer.component';
import { Activity } from '../types';

import "./activity-timer-card.component.css";

interface Props {
  activity: Activity;
}

const ActivityTimerCard = ({ activity }: Props) => {
  return (
    <IonCard color="secondary">
      <IonCardHeader>
        <IonCardTitle>Temporizador</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div className='content-container'>
          <Timer
            initialData={{ totalTime: activity.time, timeUsed: activity.timeUsed }}
          />
        </div>
      </IonCardContent>
    </IonCard>
  )
}

export default ActivityTimerCard;