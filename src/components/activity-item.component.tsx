import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonProgressBar, IonRow } from "@ionic/react";
import { Activity } from "../types";
import { formatToKey, getFormattedTimeForActivities } from "../util/time.util";

import "./activity-item.component.css";
import { time } from "ionicons/icons";
import { useRef } from "react";

export function ActivityItem({ activity, onDelete }: { activity: Activity, onDelete: (a: Activity) => void }) {

  const sliding = useRef<HTMLIonItemSlidingElement>(null);

  async function onDrag() {
    const ratio = await sliding.current?.getSlidingRatio();
    if (ratio && ratio > 3) {
      deleteActivity();
    }
  }

  function deleteActivity() {
    onDelete(activity);
    sliding.current?.close();
  }

  function calculatePercentage() {
    return (activity.timeUsed ?? 0) / activity.time;
  }

  const percentage = calculatePercentage();
  const timeRemaining = activity.time - (activity.timeUsed ?? 0);

  return (
    <IonItemSliding ref={sliding} onIonDrag={onDrag}>
      <IonItem button routerLink={`/calendar/day/${formatToKey(activity.date)}/activity/${activity.id}`}>
        <IonCard color="secondary" className={activity.primary ? "primary" : ""}>
          <IonCardHeader>
            <IonCardTitle>{activity.title}</IonCardTitle>
            <IonCardSubtitle>{getFormattedTimeForActivities([activity])}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonRow className="time-details">
              <IonRow className="time-remaining">
                <IonIcon icon={time} size="small" />
                {
                  timeRemaining >= 0 ? (
                    <p>Tiempo restante: {timeRemaining} minutos</p>
                  ) : (
                    <p>Tiempo extra: {timeRemaining * -1} minutos</p>
                  )
                }
              </IonRow>
              <p>{Math.round(percentage * 100)}% completado</p>
            </IonRow>
            <IonProgressBar value={percentage} color={percentage >= 1 ? "success" : "light"}></IonProgressBar>
          </IonCardContent>
        </IonCard>
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption color="danger" expandable onClick={deleteActivity}>Borrar</IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  )
}