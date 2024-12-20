import { IonAlert } from '@ionic/react';
import "./confirmation.component.css"

interface Props {
  onResult: (ok: boolean) => void;
  title: string;
  message?: string;
  isOpen?: boolean;
}

function Confirmation({ onResult, title, message, isOpen }: Props) {

  return (
    <IonAlert
      header={title}
      message={message}
      isOpen={isOpen}
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

export default Confirmation;