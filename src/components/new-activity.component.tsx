import { IonButton, IonInput, IonItem, IonList, IonModal, IonTitle, IonToggle } from '@ionic/react';
import React, { FormEvent, useRef } from 'react'

import "./new-activity.component.css";
import { boolean, number, object, string } from 'yup';
import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';

type Values = {
  title: string;
  duration: number;
  principal: boolean;
}

const schema = object({
  title: string()
    .min(3, "El titulo debe tener entre 3 y 15 caracteres")
    .max(15, "El titulo debe tener entre 3 y 15 caracteres")
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

function NewActivityModal() {

  const modal = useRef<HTMLIonModalElement>(null);

  async function onSubmit(values: Values) {
    alert(JSON.stringify(values));
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
            <IonList>
              <IonItem>
                <Field name="title">
                  {({ field, form, meta }: FieldProps) => (
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
                  {({ field, form, meta }: FieldProps) => (
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
                <Field name="principal">
                  {({ field, form, meta }: FieldProps) => {
                    console.log({ field, form, meta, val: meta.value })
                    return (
                      <IonToggle
                        color="secondary"
                        name='principal'
                        onIonChange={({ isTrusted }) => field.onChange(isTrusted)}
                      >
                        Es la tarea principal?
                      </IonToggle>
                    )
                  }}
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