import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, useIonToast, IonText } from '@ionic/react'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Activity } from '../types'
import { ActivityItem } from '../components/activity-item.component'
import { accessibility, add } from 'ionicons/icons'
import NewActivityModal from '../components/new-activity.component'
import { useDayStore } from '../store/day.store'
import DeleteActivity from '../components/confirmation.component'
import { fromKey } from '../util/time.util'

const DayPage: React.FC<RouteComponentProps<{ date: string }>> = ({ match }) => {

  const day = fromKey(match.params.date);
  const isToday = day.isSame(dayjs(), "day");
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
          <IonTitle>{day.format('dddd[,] DD [de] MMMM')} {isToday && (<IonText color="medium"><small><i>Hoy</i></small></IonText>)}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {data?.activities.map(act => (
          <ActivityItem activity={act} onDelete={onDelete} key={act.id} />
        ))}
        <IonFab horizontal="end" vertical="bottom" slot='fixed'>
          <IonFabButton color='secondary' id="open-modal">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
        <NewActivityModal date={day} />
        <DeleteActivity
          onResult={onDeleteResult}
          title={"Seguro que desea eliminar la actividad?"}
          message={`Se borrara "${selected?.title}"`}
          isOpen={selected !== undefined}
        />
      </IonContent>
    </IonPage>
  )
}

export default DayPage