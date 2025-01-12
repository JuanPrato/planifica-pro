import { Field as FormikField, FieldProps, FormikProps } from 'formik';
import { IonInput, IonToggle } from '@ionic/react';
import { ComponentProps } from 'react';

interface Props {
  name: string;
  label: string;
  labelPlacement?: ComponentProps<typeof IonInput>["labelPlacement"];
  type?: ComponentProps<typeof IonInput>["type"];
  disabled?: boolean | ((form: FormikProps<any>) => boolean);
}

export function Field(props: Props) {
  return (
    <FormikField name={props.name}>
      {({ field, meta, form }: FieldProps) => (
        <IonInput
          label={props.label}
          labelPlacement='stacked'
          type={props.type}
          name={props.name}
          value={field.value}
          onIonChange={field.onChange}
          errorText={meta.error}
          className={(!!meta.error && "ion-invalid") + " " + (meta.touched && "ion-touched")}
          disabled={
            typeof props.disabled === "function" ?
              props.disabled(form) :
              props.disabled
          }
        />
      )}
    </FormikField>
  )
}

interface ToggleProps {
  name: string;
  label: string;
}

export function ToggleField(props: ToggleProps) {
  return (
    <FormikField name={props.name} type="checkbox">
      {({ field, form }: FieldProps) => (
        <IonToggle
          color="secondary"
          name={props.name}
          onIonChange={({ target }) => form.setFieldValue(field.name, target.checked)}
        >
          {props.label}
        </IonToggle>
      )
      }
    </FormikField>
  )
}