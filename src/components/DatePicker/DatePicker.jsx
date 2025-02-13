import { act, useEffect, useState } from 'react';
import s from './DatePicker.module.css'
import clsx from 'clsx';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import MonthPicker from '../MonthPicker/MonthPicker';

const DatePicker = ({date, month, handleClick, year, handleChange, handleChangeNext}) => {

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    return (
      <div>
          <MonthPicker year={year} handleChange={handleChange} handleChangeNext={handleChangeNext}/>
              <ul>
              {monthNames.map((item, i) => <li key={i}  onClick={(e) => handleClick(e.target.textContent)}
                  className={clsx(s.month, i === date.getMonth() && s.current, i === month && s.active)}
              >{item}</li>)}
              </ul>
      </div>
  )
}

export default DatePicker
