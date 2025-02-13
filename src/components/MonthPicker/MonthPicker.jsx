import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import s from './MonthPicker.module.css'
import { useState } from "react";


const MonthPicker = ({date, month, year, handleChange, handleChangeNext}) => {


  return (
    <div className={s.monthPicker}>
      <button type="button" onClick={() => handleChange()}><FaArrowLeft/></button>
          <p>{month}{year}</p>    
      <button type="button" onClick={() => handleChangeNext()}><FaArrowRight/></button>
    </div>
  )
}

export default MonthPicker
