import dayjs from 'dayjs';
import { IonItem, IonGrid, IonRow, IonCol, IonLabel, IonIcon, IonItemSliding, IonItemOption, IonItemOptions } from '@ionic/react';
import { starOutline, star, starSharp } from 'ionicons/icons';
import { DayDetails } from '../types';

import "./DayItem.css";
import { formatToKey, getFormattedTimeForActivities } from '../util/time.util';

export default function DayItem({ day: { date, activities } }: { day: DayDetails }) {

  const pending = getPendingQ();
  const isToday = date.isSame(dayjs(), "day");

  function getPrimary() {
    return activities.find(a => a.primary);
  }

  function getPendingQ() {
    return activities.reduce((a, i) => a + (i.completed ? 0 : 1), 0);
  }

  return (
    <IonItem button routerLink={`/calendar/day/${formatToKey(date)}`} className={isToday ? "day-card-today" : ""} color={isToday ? "light" : undefined}>
      <IonGrid fixed>
        <IonRow className="ion-align-items-center">
          <IonCol className='date' size='2'>
            <strong>{date.format("ddd")}</strong>
            <strong>{date.format("DD")}</strong>
            <small>{date.format("MMM")}</small>
          </IonCol>
          <IonCol className='duties' size='8'>
            <IonLabel>
              <h1 className='ellipsis'>{getPrimary()?.title}</h1>
              <h2>{pending} tareas pendientes - {getFormattedTimeForActivities(activities)}</h2>
              {isToday && (<h3>Hoy</h3>)}
            </IonLabel>
          </IonCol>
          <IonCol size='2' className='star'>
            <div>
              {pending === 0 && <IonIcon aria-hidden="true" icon={starOutline} />}
              {pending === 0 && <IonIcon aria-hidden="true" icon={starSharp} className="star-fill" />}
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  )
}
