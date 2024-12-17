import { IonAlert } from '@ionic/react';
import React from 'react'
import { Activity } from '../types';

import "./delete-activity.component.css"

interface Props {
  activity?: Activity;
  onResult: (ok: boolean) => void
}

function DeleteActivity({ activity, onResult }: Props) {
  return (
    <IonAlert
      header="Seguro que desea eliminar la actividad?"
      message={`Se borrara "${activity?.title}"`}
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