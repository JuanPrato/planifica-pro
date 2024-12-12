import dayjs from 'dayjs';
import { IonItem, IonGrid, IonRow, IonCol, IonLabel, IonIcon } from '@ionic/react';
import { starOutline } from 'ionicons/icons';
import { DayDetails } from '../types';

import "./DayItem.css";

export default function DayItem({ day: { date, activities } }: { day: DayDetails }) {

  function getPrimary() {
    return activities.find(a => a.primary);
  }

  function getPendingQ() {
    return activities.reduce((a, i) => a + (i.completed ? 0 : 1), 0);
  }

  function getPendingTime() {
    const totalMinutes = activities.reduce((a, i) => a + i.time, 0);

    return dayjs()
      .startOf("day")
      .add(totalMinutes, "minutes")
      .format("HH[h] mm[m]");
  }

  return (
    <IonItem button>
      <IonGrid fixed>
        <IonRow className="ion-align-items-center">
          <IonCol className='date' size='2'>
            <strong>{date.format("ddd")}</strong>
            <strong>{date.format("DD")}</strong>
            <small>{date.format("MMM")}</small>
          </IonCol>
          <IonCol className='duties' size='9'>
            <IonLabel>
              <h1 className='ellipsis'>{getPrimary()?.title}</h1>
              <h2>{getPendingQ()} tareas pendientes - {getPendingTime()}</h2>
            </IonLabel>
          </IonCol>
          <IonCol size='1'>
            <IonIcon aria-hidden="true" icon={starOutline} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  )
}
