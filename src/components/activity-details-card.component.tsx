import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonIcon, IonItem, IonLabel, IonList, IonRow } from '@ionic/react';
import { Activity } from '../types';
import { calendarOutline, timeOutline } from 'ionicons/icons';
import { formatTime } from '../util/time.util';

interface Props {
  activity: Activity;
}

const ActivityDetailsCard = ({ activity }: Props) => {
  return (
    <IonCard color='secondary'>
      <IonCardHeader>
        <IonCardTitle>Detalles de la tarea</IonCardTitle>
      </IonCardHeader>
      <IonCardContent color='secondary'>
        <IonItem color='secondary' lines='full'>
          <IonIcon slot='start' icon={timeOutline} />
          <IonLabel>Duración: {activity.maxTime ? formatTime(activity.time) : formatTime(activity.timeUsed || 0)} minutos</IonLabel>
        </IonItem>
        <IonItem color="secondary" lines='none'>
          <IonIcon slot='start' icon={calendarOutline} />
          <IonLabel>Restante: {
            activity.maxTime ? (
              !activity.completed ? (`${activity.time - (activity.timeUsed || 0)} minutos`) : (
                `Completado`
              )) : (
              "-"
            )
          }</IonLabel>
        </IonItem>
      </IonCardContent>
    </IonCard>
  )
}

export default ActivityDetailsCard;