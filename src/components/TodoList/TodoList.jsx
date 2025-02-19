import s from './TodoList.module.css'

const TodoList = ({ data, day, openTask }) => {
  
  if (!data.length) {
    return;
  }

  return (
    <ul className={s.taskList}>
      {data.filter(({ date, repeat }) => {
        const formattedDay = day.date.toLocaleDateString('uk-UA');
        switch (repeat) {
          case 'year': return date?.slice(0, 5) === formattedDay.slice(0, 5);
          case 'month': return date?.slice(0, 2) === formattedDay.slice(0, 2);
          case 'none': return date?.slice(0, 10) === formattedDay;
          default: return false;
        }
      })
        .map(({ title, id }) => (
        <li key={id} className={s.task} onClick={() => openTask(id)}>
          <p className={s.taskTitle}>{title}</p>
        </li>
        ))
      }
    </ul>
  )
}

export default TodoList
