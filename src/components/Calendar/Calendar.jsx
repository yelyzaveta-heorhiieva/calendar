import s from './Calendar.module.css'
import { FaCirclePlus, FaRegCalendarDays } from "react-icons/fa6";
import DatePicker from '../DatePicker/DatePicker';
import MonthPicker from '../MonthPicker/MonthPicker';
import { useState } from 'react';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Calendar = ({ openForm, date, prevMonth, nextMonth, handleClick, prevYear, nextYear}) => {
    const [openPicker, setOpenPicker] = useState(false);

  return (
    <div className={s.container}>
        <button type='button' onClick={openForm} className={s.btn}><FaCirclePlus className={s.icon} /></button>
        <div className={s.filters}>
          <MonthPicker month={monthNames[date.month]} year={date.year} prevClick={prevMonth} nextClick={nextMonth}/>
          <button onClick={() => setOpenPicker(true)} className={s.btn}><FaRegCalendarDays className={s.icon} /></button>
        </div>
         {openPicker && <DatePicker closePicker={() => setOpenPicker(false)} date={date} handleClick={handleClick} prevYear={prevYear} nextYear={nextYear} monthNames={monthNames}/>}
    </div>
  )
}

export default Calendar
