import { useState,useEffect } from 'react';
import s from './Calendar.module.css'
import { FaCirclePlus, FaRegCalendarDays } from "react-icons/fa6";
import Modal from 'react-modal';
import DatePicker from '../DatePicker/DatePicker';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import MonthPicker from '../MonthPicker/MonthPicker';

const Calendar = () => {
      const date = new Date();
    const savedDate = JSON.parse(window.localStorage.getItem("date"));
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
  const [year, setYear] = useState(() => {
    if (savedDate !== null) {
      return savedDate.year;
    }
    return date.getFullYear();
  })

     const [month, setMonth] = useState(() => {
    if (savedDate !== null) {
      return savedDate.month;
    }
    return date.getMonth();
  });

    useEffect(() => {
         window.localStorage.setItem("date", JSON.stringify({month, year}));
    }, [month, year])
    const [isOpen, setIsOpen] = useState(false);

    Modal.setAppElement('#root');

    const handleClick = (data) => {
        setMonth(monthNames.indexOf(data))
    }

    const handleChange = () => {
        setMonth(prev => {
            if (prev <= 0) {
                return (prev + 12) - 1 
            }
        return prev - 1
        })
        setYear(prev => {
            if (month <= 0) {
                return prev - 1 
            }
            return prev
        })
    }

    const handleChangeNext = () => {

        setMonth(prev => {
            if (prev >= 11) {
                return (prev - 12) + 1 
            }
        return prev + 1
        })
        setYear(prev => {
            if (month >= 11) {
                return prev + 1 
            }
            return prev
        })
    }

      const handleChangeYear = () => {
        setYear(prev => prev - 1)
    }
     const handleChangeYearNext = () => {
        setYear(prev => prev + 1)
    }

    const getDaysArr = (year, month) => {
        const lala = new Date(year, month + 1, 0).getDate()
        console.log(lala);
        return Array.from({length: lala}, (_,i)=> i + 1)
    }

    // console.log(getDaysArr(year, month));

  return (
    <div>
      <div className={s.container}>
        <button><FaCirclePlus className={s.icon} /></button>
        <div className={s.filters}>
          <MonthPicker month={monthNames[month]} year={year} handleChange={handleChange} handleChangeNext={handleChangeNext}/>
          <button onClick={() => setIsOpen(true)}><FaRegCalendarDays className={s.icon} /></button>
        </div>
      </div>
        <Modal
          isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className={s.modal}
        overlayClassName={s.overlay}>
              <DatePicker date={date} month={month} year={year} handleClick={handleClick} handleChange={handleChangeYear} handleChangeNext={handleChangeYearNext}/>
        </Modal>
    </div>
  )
}

export default Calendar
