import dayjs from 'dayjs';
import { IonItem, IonGrid, IonRow, IonCol, IonLabel, IonIcon } from '@ionic/react';
import { starOutline, star, starSharp } from 'ionicons/icons';
import { DayDetails } from '../types';

import "./DayItem.css";

export default function DayItem({ day: { date, activities } }: { day: DayDetails }) {

  const pending = getPendingQ();

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
    <IonItem button routerLink={`/calendar/day/${date.format('YYYY-MM-DD')}`}>
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
              <h2>{pending} tareas pendientes - {getPendingTime()}</h2>
            </IonLabel>
          </IonCol>
          <IonCol size='2' className='star'>
            <div>
              <IonIcon aria-hidden="true" icon={starOutline} />
              {pending === 0 && <IonIcon aria-hidden="true" icon={starSharp} className="star-fill" />}
            </div>

            {/* <div className="icon-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                <path d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z" stroke-linejoin="round" className="ionicon-fill-none ionicon-stroke-width"></path>
              </svg>
            </div> */}
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  )
}
