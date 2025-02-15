import s from './TodoList.module.css'

const TodoList = ({ data, day, openTask }) => {
  


  return (
    <ul className={s.taskList}>
      {data.map(({title, id, date}) => {
        if (date.includes(day.date.toLocaleDateString('uk-UA'))) {
          return (
            <li key={id} className={s.task} onClick={() => openTask(id)}>
              <p>{title}</p>
            </li>
          )}
          return;
          })}
      
    </ul>
  )
}

export default TodoList
