import { IonButton, IonDatetime, IonInput, IonItem, IonList, IonModal, IonTitle, IonToggle } from '@ionic/react';
import React, { useRef } from 'react'

import "./new-activity.component.css";

function NewActivityModal() {

  const modal = useRef<HTMLIonModalElement>(null);

  async function onSubmit() {

  }

  return (
    <IonModal ref={modal} trigger="open-modal" initialBreakpoint={.5} breakpoints={[0, 1]}>
      <div className="block ion-margin-top form-container">
        <IonTitle className='title'>Agregar nueva tarea</IonTitle>
        <form>
          <IonList>
            <IonItem>
              <IonInput label="Nombre de la tarea" labelPlacement='floating' />
            </IonItem>
            <IonItem>
              <IonInput label="Duración" labelPlacement='floating' type='number' />
            </IonItem>
            <IonItem>
              <IonToggle checked={true} color="secondary">Es la tarea principal?</IonToggle>
            </IonItem>
            <IonButton expand='full' color="secondary" onClick={onSubmit}>Guardar tarea</IonButton>
          </IonList>
        </form>
      </div>
    </IonModal>
  )
}

export default NewActivityModal;