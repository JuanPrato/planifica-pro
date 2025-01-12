import { IonButton, IonCol, IonInput, IonItem, IonList, IonModal, IonRow, IonTitle, IonToggle } from '@ionic/react';
import { useRef } from 'react'

import "./new-activity.component.css";
import { boolean, number, object, string } from 'yup';
import { ErrorMessage, FieldProps, Form, Formik } from 'formik';
import type { Dayjs } from 'dayjs';
import { useDayStore } from '../store/day.store';
import { Field, ToggleField } from './forms/field';

type Values = {
  title: string;
  hours: number;
  minutes: number;
  principal: boolean;
  maxTime: boolean;
}

const schema = object({
  title: string()
    .min(3, "El titulo debe tener entre 3 y 15 caracteres")
    .max(25, "El titulo debe tener entre 3 y 25 caracteres")
    .required("El titulo es obligatorio"),
  hours: number()
    .min(0, "Las horas no pueden ser menor a 0")
    .required("La duración es obligatoria"),
  minutes: number()
    .min(0, "Los minutos no pueden ser menor a 0")
    .max(59, "Los minutos deben estar entre 0 y 59")
    .required("Debe ingresar un número"),
  principal: boolean().required()
});

const getInitialValues = () => ({
  title: '',
  maxTime: false,
  hours: 0,
  minutes: 0,
  principal: false
})

function NewActivityModal({ date }: { date: Dayjs }) {

  const modal = useRef<HTMLIonModalElement>(null);
  const addActivity = useDayStore((state) => state.addActivity);

  async function onSubmit(values: Values) {
    console.log(values);
    addActivity({
      id: '0',
      completed: false,
      primary: values.principal,
      time: (values.hours * 60 + values.minutes) * 60,
      title: values.title,
      timeUsed: 0,
      date,
      maxTime: values.maxTime
    });
    modal.current?.dismiss();
  }

  return (
    <IonModal ref={modal} trigger="open-modal" initialBreakpoint={.5} breakpoints={[0, 1]}>
      <div className="block ion-margin-top form-container">
        <IonTitle className='title'>Agregar nueva tarea</IonTitle>
        <Formik
          initialValues={getInitialValues()}
          onSubmit={onSubmit}
          validationSchema={schema}
        >
          <Form>
            <IonList lines='full'>
              <IonItem>
                <Field
                  name='title'
                  label='Nombre de la tarea'
                  labelPlacement='floating'
                />
              </IonItem>
              <IonItem lines='none'>
                <ToggleField
                  name='maxTime'
                  label='Tiene tiempo máximo?'
                />
              </IonItem>
              <IonItem>
                <Field
                  name='hours'
                  label='Horas'
                  type='number'
                  disabled={(form) => !form.values.maxTime}
                />
                <IonCol size='1'>
                  <IonRow className='time-separator ion-justify-content-center'><div>:</div></IonRow>
                </IonCol>
                <Field
                  name='minutes'
                  label='Minutos'
                  type='number'
                  disabled={(form) => !form.values.maxTime}
                />
              </IonItem>
              <IonItem lines='none'>
                <ToggleField
                  name='principal'
                  label='Es una tarea prioritaria?'
                />
                <ErrorMessage name='principal' />
              </IonItem>
              <IonButton expand='full' color="secondary" type='submit'>Guardar tarea</IonButton>
            </IonList>
          </Form>
        </Formik>
      </div>
    </IonModal>
  )
}

export default NewActivityModal;