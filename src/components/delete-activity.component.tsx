import { IonAlert } from '@ionic/react';
import React, { useEffect, useState } from 'react'
import { Activity } from '../types';

import "./delete-activity.component.css"

interface Props {
  activity?: Activity;
  onResult: (ok: boolean) => void
}

function DeleteActivity({ activity, onResult }: Props) {

  const [data, setData] = useState(activity);

  useEffect(() => {
    if (activity) {
      setData(activity);
    }
  }, [activity]);

  return (
    <IonAlert
      header="Seguro que desea eliminar la actividad?"
      message={`Se borrara "${data?.title}"`}
      isOpen={activity !== undefined}
      buttons={[
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: "alert-button-cancel",
          handler: () => {
            onResult(false)
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          cssClass: 'alert-button-success',
          handler: () => {
            onResult(true)
          },
        },
      ]}
      onDidDismiss={() => onResult(false)}
    ></IonAlert>
  )
}

export default DeleteActivity