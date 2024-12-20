import { IonButton, IonInput, IonItem, IonList, IonModal, IonTitle, IonToggle } from '@ionic/react';
import React, { FormEvent, useRef } from 'react'

import "./new-activity.component.css";
import { boolean, number, object, string } from 'yup';
import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import { addActivity } from '../api/days.api';
import type { Dayjs } from 'dayjs';
import { useDayStore } from '../store/day.store';

type Values = {
  title: string;
  duration: number;
  principal: boolean;
}

const schema = object({
  title: string()
    .min(3, "El titulo debe tener entre 3 y 15 caracteres")
    .max(25, "El titulo debe tener entre 3 y 25 caracteres")
    .required("El titulo es obligatorio"),
  duration: number()
    .min(0, "La duración no puede ser menor a 0")
    .required("La duración es obligatoria"),
  principal: boolean().required()
});

const getInitialValues = () => ({
  title: '',
  duration: 0,
  principal: false
})

function NewActivityModal({ date }: { date: Dayjs }) {

  const modal = useRef<HTMLIonModalElement>(null);
  const addActivity = useDayStore((state) => state.addActivity);

  async function onSubmit(values: Values) {
    addActivity({
      id: 0,
      completed: false,
      primary: values.principal,
      time: values.duration * 60,
      title: values.title,
      timeUsed: 0,
      date
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
            <IonList lines='none'>
              <IonItem>
                <Field name="title">
                  {({ field, meta }: FieldProps) => (
                    <IonInput
                      label="Nombre de la tarea"
                      labelPlacement='floating'
                      name='title'
                      value={field.value}
                      onIonChange={field.onChange}
                      errorText={meta.error}
                      className={(!!meta.error && "ion-invalid") + " " + (meta.touched && "ion-touched")}
                    />
                  )}
                </Field>
              </IonItem>
              <IonItem>
                <Field name="duration">
                  {({ field, meta }: FieldProps) => (
                    <IonInput
                      label="Duración"
                      labelPlacement='floating'
                      type='number'
                      name='duration'
                      value={field.value}
                      onIonChange={field.onChange}
                      errorText={meta.error}
                      className={(!!meta.error && "ion-invalid") + " " + (meta.touched && "ion-touched")}
                    />
                  )}
                </Field>
              </IonItem>
              <IonItem>
                <Field name="principal" type="checkbox">
                  {({ field, form }: FieldProps) => (
                    <IonToggle
                      color="secondary"
                      name='principal'
                      onIonChange={({ target }) => form.setFieldValue(field.name, target.checked)}
                    >
                      Es la tarea principal?
                    </IonToggle>
                  )
                  }
                </Field>
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