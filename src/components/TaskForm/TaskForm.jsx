import { Formik, Form, Field, ErrorMessage } from 'formik'
import s from './TaskForm.module.css'
import * as Yup from "yup";
import { nanoid } from 'nanoid';

const TaskForm = ({onSubmit, initialValues, onEdit}) => {

  const handleSubmit = (values) => {
    if (!initialValues.title) {
      onSubmit({ ...values, id: nanoid() });
    };
    onEdit(values) 
  }

  const dateTimeRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})(?:, (\d{2}):(\d{2}))?$/;

  const validationSchema = Yup.object().shape({
  title: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
  date: Yup
      .string()
    .matches(dateTimeRegex, 'Format must be DD.MM.YYYY or DD.MM.YYYY HH:MM')
    .test('isValidDateTime', 'Invalid date or time', (value) => {
      if (!value) return false;

      const match = value.match(dateTimeRegex);

      if (!match) return false;

      const [, day, month, year, hours, minutes] = match.map(Number);
      const date = new Date(year, month - 1, day);

      if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        return false;
      }

      if (hours !== undefined && (hours < 0 || hours > 23 || minutes < 0 || minutes > 59)) {
        return false;
      }

      return true;
    }).required('Date is required'),
});



  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        <Form>
          <label>Title
            <Field name="title" />
            <ErrorMessage className={s.error} name="title" component="span" />
          </label>
          <label>Description
            <Field name="description" />
          </label>
          <label>Date
            <Field name='date' />
            <ErrorMessage className={s.error} name="date" component="span" />
          </label>
          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    </>
  )
}

export default TaskForm

