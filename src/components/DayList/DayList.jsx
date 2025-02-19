import s from './DayList.module.css';
import clsx from 'clsx';
import TodoList from '../TodoList/TodoList';

const week = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const DayList = ({ days, currentDay, data, openTask, openForm, date, moveTask, reorderTasks }) => {
  
    const handleDrop = (e, date) => {
    e.preventDefault();
      const taskId = e.dataTransfer.getData('taskId');
    moveTask(taskId, date);
  };

  return (
    <ul className={s.list}>
      {days.map((item, i) => (
        <li key={i} onClick={() => openForm(item.date)}
            className={clsx(s.item, item.date.toLocaleDateString() === currentDay.toLocaleDateString() && s.current,
              item.date.getMonth() !== date.month && s.nonActive)} onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, item.date)}
          >
            <div className={s.wrapper}>
              <p>{item.date.getDate()}</p>
              <p className={s.day}>{week[item.day]}</p>
            </div>
            <TodoList data={data} day={item} openTask={openTask} reorderTasks={reorderTasks} />
          </li>)
      )}
    </ul>
  )
}

export default DayList
