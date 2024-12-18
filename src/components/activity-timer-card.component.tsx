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
          <Timer activity={activity} />
          <div>
            <IonButton color="success">
              <IonIcon slot='start' icon={playOutline} size='small' />
              Iniciar
            </IonButton>
            <IonButton color="warning">
              <IonIcon slot='start' icon={refreshOutline} size='small' />
              Reiniciar
            </IonButton>
          </div>
          <IonToggle labelPlacement='end'>Agregar descansos</IonToggle>
        </div>
      </IonCardContent>
    </IonCard>
  )
}

export default ActivityTimerCard;