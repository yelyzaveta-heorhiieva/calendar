import s from './TodoList.module.css'

const TodoList = ({ data, day, openTask }) => {
  


  return (
    <ul className={s.taskList}>
      {data.map(({ title, id, date, repeat }) => {
        const markup = (<li key={id} className={s.task} onClick={() => openTask(id)}>
          <p className={s.taskTitle}>{title}</p>
        </li>)
        switch (repeat) {
          case 'year': return date.slice(0, 5).includes(day.date.toLocaleDateString('uk-UA').slice(0, 5)) && markup;
            break;
          case 'month': return date.slice(0, 2).includes(day.date.toLocaleDateString('uk-UA').slice(0, 2)) && markup;
            break;
          case 'none': return date.includes(day.date.toLocaleDateString('uk-UA')) && markup;
            break;
          default: return;
        }
      })
}   
    </ul>
  )
}

export default TodoList
