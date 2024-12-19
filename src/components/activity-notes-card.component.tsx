import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonList, IonText } from '@ionic/react';

import "./activity-notes-card.component.css";
import { Note } from '../types';

interface Props {
  notes?: Note[];
}

function ActivityNoteCard({ notes }: Props) {

  return (
    <IonCard color='secondary'>
      <IonCardHeader>
        <IonCardTitle>Notas</IonCardTitle>
      </IonCardHeader>
      <IonCardContent color='secondary'>
        {
          (notes && notes.length > 0) ? (
            <IonList className='notes-list'>
              <IonItem color='secondary'>
              </IonItem>
            </IonList>
          ) : (
            <h2>Aún no tienes notas en esta actividad</h2>
          )
        }
      </IonCardContent>
    </IonCard>
  )
}

export default ActivityNoteCard;