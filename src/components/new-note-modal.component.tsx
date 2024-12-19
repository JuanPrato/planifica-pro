import { IonButton, IonItem, IonModal, IonTextarea, IonTitle } from '@ionic/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import { useRef } from 'react'

function NewNoteModal() {

  const modal = useRef<HTMLIonModalElement>(null);


  return (
    <IonModal ref={modal} trigger="open-modal-note" initialBreakpoint={.5} breakpoints={[0, 1]}>
      <div className="block ion-margin-top form-container">
        <IonTitle className='title'>Agregar nueva tarea</IonTitle>
        <Formik
          initialValues={{ note: '' }}
          onSubmit={() => { }}
        >
          <Form>
            <IonItem>
              <Field name="note">
                {
                  (props: FieldProps) => (
                    <IonTextarea
                      label='Nota'
                      labelPlacement='stacked'
                      placeholder='Página 3 - Volver a leer sale en parcial'
                      value={props.field.value}
                      onIonChange={props.field.onChange}
                    />
                  )
                }
              </Field>
            </IonItem>
            <IonButton color="secondary" expand='full'>Añadir</IonButton>
          </Form>
        </Formik>
      </div>
    </IonModal>
  )
}

export default NewNoteModal;