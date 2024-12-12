import dayjs, { Dayjs } from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import es from 'dayjs/locale/es';
import { IonItem, IonGrid, IonRow, IonCol, IonLabel, IonIcon } from '@ionic/react';
import { starOutline } from 'ionicons/icons';
import { DayDetails } from '../types';

dayjs.extend(updateLocale);

dayjs.locale(es);
dayjs.updateLocale('es', {
  weekdays: es.weekdays?.map(d => `${d[0]?.toUpperCase()}${d.slice(1)}`),
  weekdaysShort: es.weekdaysShort?.map(d => `${d[0]?.toUpperCase()}${d.slice(1)}`)
})

export default function DayItem({ day: { date, activities } }: { day: DayDetails }) {

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
      <IonGrid>
        <IonRow className="ion-align-items-center">
          <IonCol className='date' size='2'>
            <strong>{date.format("ddd")}</strong>
            <strong>{date.format("DD")}</strong>
            <small>{date.format("MMM")}</small>
          </IonCol>
          <IonCol className='duties'>
            <IonLabel>
              <h1><strong>{getPendingQ()} tareas pendientes</strong></h1>
              <h2>{getPendingTime()}</h2>
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
