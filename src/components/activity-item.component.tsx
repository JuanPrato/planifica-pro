import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import { Activity } from "../types";
import { getFormattedTimeForActivities } from "../util/time.util";

import "./activity-item.component.css";

export function ActivityItem({ activity }: { activity: Activity }) {

  return (
    <IonCard color="secondary" className={activity.primary ? "primary" : ""}>
      <IonCardHeader>
        <IonCardTitle>{activity.title}</IonCardTitle>
        <IonCardSubtitle>{getFormattedTimeForActivities([activity])}</IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  )
}