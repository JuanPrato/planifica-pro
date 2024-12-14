import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/react'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { getDayDetails } from '../api/days.api'
import { DayDetails } from '../types'
import { ActivityItem } from '../components/activity-item.component'
import { add } from 'ionicons/icons'

const DayPage: React.FC<RouteComponentProps<{ date: string }>> = ({ match }) => {

  const day = dayjs(match.params.date);
  const [data, setData] = useState<DayDetails | null>(null);

  useEffect(() => {
    getDayDetails(day).then(d => setData(d));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='secondary'>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{day.format('dddd[,] DD [de] MMMM')}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <br />
        {data?.activities.map(act => (
          <ActivityItem activity={act} />
        ))}
        <IonFab horizontal="end" vertical="bottom">
          <IonFabButton color='secondary'>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}

export default DayPage