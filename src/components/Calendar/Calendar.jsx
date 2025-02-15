import { useState,useEffect } from 'react';
import s from './Calendar.module.css'
import { FaCirclePlus, FaRegCalendarDays } from "react-icons/fa6";
import Modal from 'react-modal';
import DatePicker from '../DatePicker/DatePicker';
import MonthPicker from '../MonthPicker/MonthPicker';
import DayList from '../DayList/DayList';
import TaskForm from '../TaskForm/TaskForm';

const Calendar = () => {
    const today = new Date();

    const formattedDateTime = (newDate) => {
    const day = String(newDate.getDate()).padStart(2, '0');
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); 
    const year = newDate.getFullYear();
    const hours = String(newDate.getHours()).padStart(2, '0');
        const minutes = String(newDate.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year}, ${hours}:${minutes}`;
    }

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState(() => {
        const savedDate = JSON.parse(window.localStorage.getItem("date"));
        if (savedDate !== null) {
      return savedDate;
    }
        return {
            month: today.getMonth(),
            year: today.getFullYear(),
        }
        
    })
    const [days, setDays] = useState([]);
    const [currentDay, setCurrentDay] = useState(null);
    const [formIsOpen, setFormIsOpen] = useState(false);
    const [values, setValues] = useState({title: '', description: '', date: formattedDateTime(today),});
    const [data, setData] = useState(() => {
        const savedData = JSON.parse(window.localStorage.getItem("data"));
        if (savedData !== null) {
      return savedData;
    }
        return [];    
    })
    

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
           window.localStorage.setItem("data", JSON.stringify(data));
           setDays(getDaysArr(date))
           setCurrentDay(null)
           if (date.year === (today.getFullYear()) && date.month === (today.getMonth())) {
     return setCurrentDay(today.getDate())
    }
       }, [date, data])
    

    const onSubmit = (obj) => {
        closeForm();
        setData(prev => [...prev, obj])
    }

    const openTask = (id) => {
        const task = data.filter(item => item.id === id);
        task.map(item => setValues(item));
        setFormIsOpen(true);
    }

      const onEdit = (obj) => {
          closeForm();
          setData(prev => prev.map((item) => {
              if (item.id === obj.id) {
                  return obj;
                }
          return item;
          }))
    }

    const closeForm = () => {
        setValues({ title: '', description: '', date: formattedDateTime(today), });
        setFormIsOpen(false);
    }

    const openForm = (currentDay) => {
        setFormIsOpen(true)
        setValues(prev => ({...prev, date: formattedDateTime(currentDay)}))
    }

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
        onRequestClose={closeForm}
        className={s.modal}
        overlayClassName={s.overlay}>
              <TaskForm onSubmit={onSubmit} initialValues={values} onEdit={onEdit} />
          </Modal>
          <DayList days={days} currentDay={currentDay} data={data} openTask={openTask} openForm={openForm} />
    </div>
  )
}

export default Calendar
