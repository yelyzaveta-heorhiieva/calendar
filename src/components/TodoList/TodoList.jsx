import { useState } from 'react';
import s from './TodoList.module.css'

const TodoList = ({ data, day, openTask, reorderTasks }) => {


const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

   const handleReorderStart = (e, index) => {
    e.dataTransfer.setData('index', index);
  };

  const handleReorderDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = e.dataTransfer.getData('index');
    reorderTasks(dragIndex, dropIndex);
  };

  
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
        .map(({ title, id }, index) => (
          <li key={id} className={s.task} onClick={() => openTask(id)} draggable={true}
            onDragStart={(e) => { handleDragStart(e, id); handleReorderStart(e, index)}} 
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleReorderDrop(e, index)}>
          <p className={s.taskTitle}>{title}</p>
        </li>
        ))
      }
    </ul>
  )
}

export default TodoList
