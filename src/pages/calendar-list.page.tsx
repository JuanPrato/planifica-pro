import { IonButton, IonContent, IonHeader, IonIcon, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';

import './Calendar.css';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import DayItem from '../components/DayItem';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getStartOfWeek } from '../util/time.util';
import { useDayStore } from '../store/day.store';
import { Preferences } from '@capacitor/preferences';
import { useUserStore } from '../store/user.store';

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

  useEffect(() => {
    updateDaysData(getWeekdays(week));
  }, [user]);

  function updateWeek(plus: number) {
    const w = getStartOfWeek(week.add(plus, "week"));
    setWeek(w);
    updateDaysData(getWeekdays(w));
  }

  return (
    <IonPage>
      <IonHeader >
        <IonToolbar color="secondary">
          <IonTitle>Calendario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Primera pestaña</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRow className='calendar-header ion-justify-content-around ion-align-items-center'>
          <IonButton fill='clear' color="dark" onClick={() => updateWeek(-1)}>
            <IonIcon aria-hidden="true" icon={chevronBackOutline} />
          </IonButton>
          <IonText>Semana del {week.format("DD [de] MMMM")}</IonText>
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
        <IonButton onClick={() => Preferences.clear()} />
      </IonContent>
    </IonPage>
  );
};

export default CalendarPage;
