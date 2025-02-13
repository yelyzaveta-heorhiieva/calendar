import { useState } from 'react';
import s from './DayList.module.css';
import clsx from 'clsx';
import TodoList from '../TodoList/TodoList';
import { nanoid } from 'nanoid';

const DayList = ({ days, currentDay, data}) => {

    const week = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];


  return (
    <ul className={s.list}>
          {days.map((day, i) =>
           {   
          return (<li key={i} className={clsx(s.item, i === currentDay - 1 && s.current)}>
            <div className={s.wrapper}>
                <p>{i + 1}</p>
                <p>{week[day.day]}</p>
            </div>
              {data.map(item => {
                  if (day.date.toString() === item.date.toString()) {
                   return  <p key={item.title}>{item.title}</p>
                  }
                  return;
              })}
          </li>)})}
    </ul>
  )
}

export default DayList
