import { useState,useEffect } from 'react';
import s from './Calendar.module.css'
import { FaCirclePlus, FaRegCalendarDays } from "react-icons/fa6";
import Modal from 'react-modal';
import DatePicker from '../DatePicker/DatePicker';
import MonthPicker from '../MonthPicker/MonthPicker';
import DayList from '../DayList/DayList';
import TaskForm from '../TaskForm/TaskForm';

const Calendar = () => {

    const newDate = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState(() => {
        const savedDate = JSON.parse(window.localStorage.getItem("date"));
        if (savedDate !== null) {
      return savedDate;
    }
        return {
            month: newDate.getMonth(),
            year: newDate.getFullYear(),
        }
        
    })
    const [days, setDays] = useState([]);
    const [currentDay, setCurrentDay] = useState(null);
    const [formIsOpen, setFormIsOpen] = useState(false);
    

    Modal.setAppElement('#root');

    const handleClick = (data) => {
        setDate(prev => ({...prev, month: monthNames.indexOf(data)}))
    }
    
    
    const handleChange = () => {
        setDate(prev => {
            if (prev.month <= 0) {
                return {
                    ...prev,
                    month: (prev.month + 12) - 1,
                    year: prev.year - 1,
                }
            }
            return {
                ...prev,
                    month: prev.month - 1,
                    year: prev.year
                }
        })
    }

    const handleChangeNext = () => {
                 setDate(prev => {
            if (prev.month >= 11) {
                return {
                    ...prev,
                    month: (prev.month - 12) + 1,
                    year: prev.year + 1 
                }
            }
                     return {
                ...prev,
                    month: prev.month + 1,
                    year: prev.year
                }
        })
    }

    const handleChangeYear = () => {
        setDate(prev => ({...prev, year: prev.year - 1}))
    }
     const handleChangeYearNext = () => {
        setDate(prev => ({...prev, year: prev.year + 1}))
    }


    const getDaysArr = ({year, month}) => {
        const daysAmount = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: daysAmount }, (_, i) => 
            ({ day: new Date(year, month, i + 1).getDay(), date: new Date(year, month, i + 1)}))
    }


       useEffect(() => {
           window.localStorage.setItem("date", JSON.stringify(date));
           setDays(getDaysArr(date))
           setCurrentDay(null)
           if (date.year === (newDate.getFullYear()) && date.month === (newDate.getMonth())) {
     return setCurrentDay(newDate.getDate())
    }
       }, [date])
    
    const data = [
        {
            title: 'lalalalal',
            description: 'nkjjdkjshks',
            date: new Date(2025, 1, 14)
        },
         {
            title: 'tototot',
            description: 'nkjjdkjshks',
            date: new Date(2025, 1, 14)
        },
        {
            title: 'lfhdj',
            description: 'nkjjdkjshks',
            date: new Date(2024, 11, 1)
        },
        {
            title: 'kooso',
            description: 'nkjjdkjshks',
            date: new Date(2025, 3, 21)
        },
         {
            title: 'werty',
            description: 'nkjjdkjshks',
            date: new Date(2023, 10, 8)
        },
    ]


  return (
    <div>
      <div className={s.container}>
        <button type='button' onClick={() => setFormIsOpen(true)}><FaCirclePlus className={s.icon} /></button>
        <div className={s.filters}>
          <MonthPicker month={monthNames[date.month]} year={date.year} handleChange={handleChange} handleChangeNext={handleChangeNext}/>
          <button onClick={() => setIsOpen(true)}><FaRegCalendarDays className={s.icon} /></button>
        </div>
      </div>
        <Modal
          isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className={s.modal}
        overlayClassName={s.overlay}>
              <DatePicker date={date} month={date.month} year={date.year} handleClick={handleClick} handleChange={handleChangeYear} handleChangeNext={handleChangeYearNext} monthNames={monthNames}/>
          </Modal>
          <Modal
          isOpen={formIsOpen}
        onRequestClose={() => setFormIsOpen(false)}
        className={s.modal}
        overlayClassName={s.overlay}>
             <TaskForm />
          </Modal>
          <DayList days={days} currentDay={currentDay} data={data} />
    </div>
  )
}

export default Calendar
