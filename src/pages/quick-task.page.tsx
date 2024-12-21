import { IonButton, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToggle, IonToolbar, useIonRouter } from '@ionic/react';
import './quick-task.page.css';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { boolean, number, object, string } from 'yup';
import { useDayStore } from '../store/day.store';
import dayjs from 'dayjs';
import { formatToKey } from '../util/time.util';

type Values = {
  title: string;
  hours: number;
  minutes: number;
  principal: boolean;
}

const schema = object({
  title: string()
    .min(3, "El titulo debe tener entre 3 y 15 caracteres")
    .max(25, "El titulo debe tener entre 3 y 25 caracteres")
    .required("El titulo es obligatorio"),
  hours: number()
    .min(0, "La duración no puede ser menor a 0")
    .required("Se debe introducir las horas"),
  minutes: number()
    .min(0, "La tarea debe tener un tiempo")
    .required("La tarea debe tener un tiempo"),
  principal: boolean().required()
});

const QuickTaskPage: React.FC = () => {

  const addActivity = useDayStore((state) => state.addActivity);

  const router = useIonRouter();

  async function onSubmit(values: Values, actions: FormikHelpers<Values>) {

    const today = dayjs();

    const id = await addActivity({
      id: -1,
      completed: false,
      date: today,
      primary: values.principal,
      time: values.hours * 60 + values.minutes,
      title: values.title
    });

    router.push(`/calendar/day/${formatToKey(today)}/activity/${id}`);

    actions.resetForm();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='secondary'>
          <IonTitle>Agregar una tarea al día</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Formik<Values>
          initialValues={{ title: '', principal: false, hours: 0, minutes: 0 }}
          onSubmit={onSubmit}
          validationSchema={schema}
        >
          <Form className='form'>
            <IonList className='form-items'>
              <IonItem>
                <Field name="title">
                  {({ field, meta }: FieldProps) => (
                    <IonInput
                      label="Nombre de la tarea"
                      labelPlacement='stacked'
                      name='title'
                      value={field.value}
                      onIonChange={field.onChange}
                      errorText={meta.error}
                      className={(!!meta.error && "ion-invalid") + " " + (meta.touched && "ion-touched")}
                    />
                  )}
                </Field>
              </IonItem>
              <IonItem lines='none'>
                <IonLabel>Duración</IonLabel>
              </IonItem>
              <IonItem>
                <IonRow>
                  <IonCol>
                    <Field name="hours">
                      {({ field, meta }: FieldProps) => (
                        <IonInput
                          label="Horas"
                          labelPlacement='stacked'
                          name='hours'
                          value={field.value}
                          onIonChange={field.onChange}
                          errorText={meta.error}
                          className={(!!meta.error && "ion-invalid") + " " + (meta.touched && "ion-touched")}
                          type='number'
                        />
                      )}
                    </Field>
                  </IonCol>
                  <IonCol>
                    <Field name="minutes">
                      {({ field, meta }: FieldProps) => (
                        <IonInput
                          label="Minutos"
                          labelPlacement='stacked'
                          name='minutes'
                          value={field.value}
                          onIonChange={field.onChange}
                          errorText={meta.error}
                          className={(!!meta.error && "ion-invalid") + " " + (meta.touched && "ion-touched")}
                          type='number'
                        />
                      )}
                    </Field>
                  </IonCol>
                </IonRow>
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
              </IonItem>
              <IonItem>
                <IonButton slot='end' expand='block' color="secondary" type='submit'>Agregar y comenzar la tarea</IonButton>
              </IonItem>
            </IonList>
          </Form>
        </Formik>
      </IonContent>
    </IonPage>
  );
};

export default QuickTaskPage;
