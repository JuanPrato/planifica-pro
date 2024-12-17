import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, useIonToast } from '@ionic/react'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { getDayDetails } from '../api/days.api'
import { Activity, DayDetails } from '../types'
import { ActivityItem } from '../components/activity-item.component'
import { add } from 'ionicons/icons'
import NewActivityModal from '../components/new-activity.component'
import { useDayStore } from '../store/day.store'
import DeleteActivity from '../components/delete-activity.component'

const DayPage: React.FC<RouteComponentProps<{ date: string }>> = ({ match }) => {

  const day = dayjs(match.params.date);
  const data = useDayStore((state) => state.getDayData(day));
  const deleteActivity = useDayStore((state) => state.deleteActivity);
  const [notification] = useIonToast();

  const [selected, setSelected] = useState<Activity | undefined>();

  function onDelete(activity: Activity) {
    setSelected(activity);
  }

  function onDeleteResult(success: boolean) {
    if (success && selected) {
      deleteActivity(day, selected);
      notification({
        message: "Se ha eliminado con éxito",
        duration: 1500
      });
    }
    setSelected(undefined);
  }

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
          <ActivityItem activity={act} onDelete={onDelete} />
        ))}
        <IonFab horizontal="end" vertical="bottom">
          <IonFabButton color='secondary'>
            <IonIcon icon={add} id="open-modal"></IonIcon>
          </IonFabButton>
        </IonFab>
        <NewActivityModal date={day} />
        <DeleteActivity activity={selected} onResult={onDeleteResult} />
      </IonContent>
    </IonPage>
  )
}

export default DayPage