import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent } from '@ionic/react'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { getDayDetails } from '../api/days.api'
import { DayDetails } from '../types'

const DayPage: React.FC<RouteComponentProps<{ date: string }>> = ({ match }) => {

  const day = dayjs(match.params.date);
  const [data, setData] = useState<DayDetails | null>(null);

  useEffect(() => {
    getDayDetails(day).then(d => setData(d));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{day.format('dddd DD [de] MMMM')}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <br />
        {JSON.stringify(data)}
      </IonContent>
    </IonPage>
  )
}

export default DayPage