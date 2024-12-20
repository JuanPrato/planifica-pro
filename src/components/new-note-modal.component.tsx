import { IonButton, IonItem, IonModal, IonTextarea, IonTitle } from '@ionic/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import { useRef } from 'react'
import { useDayStore } from '../store/day.store';
import { object, string } from 'yup';
import { Activity } from '../types';

type Values = {
  note: string;
}

const schema = object({
  note: string()
    .min(1, "La nota debe tener al menos un carácter")
    .required("Debes introducir un mensaje")
})

interface Props {
  activity: Activity;
}

function NewNoteModal({ activity }: Props) {

  const modal = useRef<HTMLIonModalElement>(null);
  const addNote = useDayStore((state) => state.addNote);

  function onSubmit(values: Values) {
    addNote(activity, { id: 0, note: values.note });
    modal.current?.dismiss();
  }

  return (
    <IonModal ref={modal} trigger="open-modal-note" initialBreakpoint={.5} breakpoints={[0, 1]}>
      <div className="block ion-margin-top form-container">
        <IonTitle className='title'>Agregar nueva tarea</IonTitle>
        <Formik
          initialValues={{ note: '' }}
          onSubmit={onSubmit}
          validationSchema={schema}
        >
          <Form>
            <IonItem>
              <Field name="note">
                {
                  (props: FieldProps) => (
                    <IonTextarea
                      label='Nota'
                      name='note'
                      labelPlacement='stacked'
                      placeholder='Página 3 - Volver a leer sale en parcial'
                      value={props.field.value}
                      onIonChange={props.field.onChange}
                      errorText={props.meta.error}
                      className={(!!props.meta.error && "ion-invalid") + " " + (props.meta.touched && "ion-touched")}
                    />
                  )
                }
              </Field>
            </IonItem>
            <IonButton color="secondary" expand='full' type='submit'>Añadir</IonButton>
          </Form>
        </Formik>
      </div>
    </IonModal>
  )
}

export default NewNoteModal;