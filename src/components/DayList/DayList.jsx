import s from './DayList.module.css';
import clsx from 'clsx';
import TodoList from '../TodoList/TodoList';


const DayList = ({ days, currentDay, data, openTask, openForm, date}) => {

  const week = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <ul className={s.list}>
          {days.map((item, i) =>
          {   
            return (<li key={i} onClick={() => openForm(item.date)}
              className={clsx(s.item, item.date.toLocaleDateString() === currentDay.toLocaleDateString() && s.current, 
              item.date.getMonth() !== date.month && s.nonActive)}
              >
            <div className={s.wrapper}>
                <p>{item.date.getDate()}</p>
                <p className={s.day}>{week[item.day]}</p>
            </div>
              <TodoList data={data} day={item} openTask={openTask} />
          </li>)})}
    </ul>
  )
}

export default DayList
