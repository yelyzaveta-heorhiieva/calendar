import { Formik, Form, Field, ErrorMessage } from 'formik'
import s from './TaskForm.module.css'
import * as Yup from "yup";
import { nanoid } from 'nanoid';
import clsx from 'clsx';
import { IoClose } from 'react-icons/io5';

const TaskForm = ({onSubmit, initialValues, onEdit, openEdit, onDelete, closeForm}) => {

  const handleSubmit = (values) => {
    if (!initialValues.title) {
      onSubmit({
        title: values.title.trim(),
        description: values.description.trim(),
        date: values.date,
        repeat: values.repeat,
        id: nanoid()
      });
    };
    onEdit({
      ...initialValues,
        title: values.title.trim(),
        description: values.description.trim(),
      date: values.date,
      repeat:values.repeat,
      }) 
  }

  const dateTimeRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})(?:, (\d{2}):(\d{2}))?$/;

  const validationSchema = Yup.object().shape({
  title: Yup.string().min(1, "Too Short!").max(50, "Too Long!").trim().required("Required"),
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
        <Form className={s.form}>
          <h2 className={s.title}>Add new idea item</h2>
          <button type="button" onClick={() => closeForm()} className={s.closeBtn}><IoClose className={s.closeIcon} /></button>
          <label className={s.label}><span>
            Title
            <span className={s.required}>*</span>
            <ErrorMessage className={s.error} name="title" component="span" /></span>
            <Field name="title" className={s.input} autoFocus />
          </label>
          <label className={s.label}>Description
            <Field name="description" className={clsx(s.input, s.area)}  as="textarea"/>
          </label>
          <label className={s.label}>
            <span>Date
              <span className={s.required}>*</span>
            <ErrorMessage className={s.error} name="date" component="span" />
            </span>
            <Field name='date' className={s.input} />
          </label>
          <label className={s.label}>Check
            <Field as="select" name="repeat" className={s.input}>
          <option value='year'>Repeat every year</option>
          <option value='month'>Repeat every month</option>
          <option value='none' >No repeat</option>
        </Field>
          </label>
          <div className={s.btnContainer}>
            <button className={s.btn} type='submit'>Save</button>
            {openEdit && <button type='button' className={clsx(s.btn, s.delete)} onClick={() => onDelete(initialValues.id)}>Delete</button>}
          </div>
        </Form>
      </Formik>
    </>
  )
}

export default TaskForm

