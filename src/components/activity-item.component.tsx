import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonProgressBar, IonRow } from "@ionic/react";
import { Activity } from "../types";
import { getFormattedTimeForActivities } from "../util/time.util";

import "./activity-item.component.css";
import { time } from "ionicons/icons";

export function ActivityItem({ activity }: { activity: Activity }) {

  function calculatePercentage() {
    return (activity.timeUsed ?? 0) / activity.time;
  }

  const percentage = calculatePercentage();
  const timeRemaining = activity.time - (activity.timeUsed ?? 0);

  return (
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
  )
}