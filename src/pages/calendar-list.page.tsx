import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';

import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import DayItem from '../components/DayItem';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getStartOfWeek } from '../util/time.util';
import { useDayStore } from '../store/day.store';
import { useUserStore } from '../store/user.store';

import './Calendar.css';

function getWeekdays(initialDate?: dayjs.Dayjs) {
  const now = dayjs(initialDate);
  const daysOfWeek = [now];

  for (let i = 0; i < 6; i++) {
    daysOfWeek.push(daysOfWeek[i].add(1, "day"));
  }

  return daysOfWeek;
}

const CalendarPage: React.FC = () => {

  const [week, setWeek] = useState(getStartOfWeek(dayjs()));
  const { days, updateDaysData } = useDayStore();
  const user = useUserStore(s => s.user);
  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    updateWeek(0);
  }, [user]);

  async function updateWeek(plus: number) {
    await present({
      message: "Cargando tareas...",
      cssClass: "task-loading",
      id: "1"
    })
    const w = getStartOfWeek(week.add(plus, "week"));
    await updateDaysData(getWeekdays(w));
    setWeek(w);
    await dismiss();
  }

  const thisWeek = week.isSame(dayjs(), "week");

  return (
    <IonPage>
      <IonHeader >
        <IonToolbar color="secondary">
          <IonTitle>Calendario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRow className='calendar-header ion-justify-content-around ion-align-items-center'>
          <IonButton fill='clear' color="dark" onClick={() => updateWeek(-1)}>
            <IonIcon aria-hidden="true" icon={chevronBackOutline} />
          </IonButton>
          <div className='week-text-container'>
            <IonText>Semana del {week.format("DD [de] MMMM")}</IonText>
            {thisWeek && (<p>Esta semana</p>)}
          </div>
          <IonButton fill='clear' color="dark" onClick={() => updateWeek(1)}>
            <IonIcon aria-hidden="true" icon={chevronForwardOutline} />
          </IonButton>
        </IonRow>
        <IonList lines='full'>
          {
            days.map((day) => (
              <DayItem day={day} key={day.date.toString()} />
            ))
          }
        </IonList>
        {/* <IonButton onClick={() => Preferences.clear()} /> */}
      </IonContent>
    </IonPage>
  );
};

export default CalendarPage;
