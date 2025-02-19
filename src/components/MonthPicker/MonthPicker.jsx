import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import s from './MonthPicker.module.css'
import clsx from "clsx";


const MonthPicker = ({ month, year, prevClick, nextClick}) => {

  return (
    <div className={clsx(s.monthPicker, month && s.month)}>
      <button className={s.btn} type="button" onClick={prevClick} aria-label="Previous month"><FaArrowLeft className={s.iconBtn} /></button>
          <p className={s.text}>{month} {year}</p>    
      <button className={s.btn} type="button" onClick={nextClick} aria-label="Next month"><FaArrowRight className={s.iconBtn} /></button>
    </div>
  )
}

export default MonthPicker
