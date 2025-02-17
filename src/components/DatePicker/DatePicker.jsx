import s from './DatePicker.module.css'
import clsx from 'clsx';
import MonthPicker from '../MonthPicker/MonthPicker';
import { IoClose } from 'react-icons/io5';

const DatePicker = ({ month, handleClick, year, prevYear, nextYear, monthNames, closePicker }) => {
    
    const currentData = new Date();
    const handlePicker = (e) => {
        handleClick(monthNames.indexOf(e.target.textContent));
        closePicker();
    }

    return (
        <div className={s.overlay}>
            <div className={s.picker}>
                <button type="button" onClick={() => closePicker()} className={s.closeBtn}><IoClose className={s.closeIcon} /></button>
                <MonthPicker year={year} prevClick={prevYear} nextClick={nextYear} />
                  <ul className={s.monthList}>
                  {monthNames.map((item, i) => <li key={i}  onClick={(e) => handlePicker(e)}
                      className={clsx(s.month, i === currentData.getMonth() && s.current, i === month && s.active)}
                  >{item}</li>)}
                  </ul>
            </div>
        </div>
  )
}

export default DatePicker
