import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent } from '@ionic/react'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

const DayPage: React.FC<RouteComponentProps<{ date: string }>> = ({ match }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>User Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <br />
        {/* User {match?.params?.date} */}
      </IonContent>
    </IonPage>
  )
}

export default DayPage