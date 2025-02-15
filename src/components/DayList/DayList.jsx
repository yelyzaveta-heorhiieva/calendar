import { useState } from 'react';
import s from './DayList.module.css';
import clsx from 'clsx';
import TodoList from '../TodoList/TodoList';
import { nanoid } from 'nanoid';

const DayList = ({ days, currentDay, data, openTask, openForm}) => {

    const week = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];


  return (
    <ul className={s.list}>
          {days.map((item, i) =>
          {   
          return (<li key={i} className={clsx(s.item, i === currentDay - 1 && s.current)} onClick={()=>openForm(item.date)}>
            <div className={s.wrapper}>
                <p>{i + 1}</p>
                <p>{week[item.day]}</p>
            </div>
            <TodoList data={data} day={item} openTask={openTask}/>
          </li>)})}
    </ul>
  )
}

export default DayList
