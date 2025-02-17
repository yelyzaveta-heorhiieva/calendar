import { useState,useEffect } from 'react'
import './App.css'
import Calendar from './components/Calendar/Calendar'
import DayList from './components/DayList/DayList';
import TaskForm from './components/TaskForm/TaskForm';
import Modal from 'react-modal';



function App() {
    const today = new Date();

    const formattedDateTime = (newDate) => {
    const day = String(newDate.getDate()).padStart(2, '0');
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); 
    const year = newDate.getFullYear();
    const hours = String(newDate.getHours()).padStart(2, '0');
        const minutes = String(newDate.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year}, ${hours}:${minutes}`;
    }
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
    const [formIsOpen, setFormIsOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [values, setValues] = useState({title: '', description: '', date: formattedDateTime(today),});
    const [data, setData] = useState(() => {
        const savedData = JSON.parse(window.localStorage.getItem("data"));
        if (savedData !== null) {
      return savedData;
    }
        return [];    
    })
    

    Modal.setAppElement('#root');

    const changeMonth = (data) => {
        setDate(prev => ({...prev, month: data}))
    }
    
    const prevMonth = () => {
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

    const nextMonth = () => {
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

    const prevYear = () => {
        setDate(prev => ({...prev, year: prev.year - 1}))
    }
     const nextYear = () => {
        setDate(prev => ({...prev, year: prev.year + 1}))
     }
    
    const getDaysArr = ({ year, month }) => {

     const getDays = (y, m) =>
        Array.from({ length: new Date(y, m + 1, 0).getDate() }, (_, i) => {
            const date = new Date(y, m, i + 1);
            return { day: date.getDay(), date };
        });

    const prevMonth = getDays(year, month - 1);
    const currentMonth = getDays(year, month);
    const nextMonth = getDays(year, month + 1);
        
    const prevI = prevMonth.map(({ day }) => day).lastIndexOf(1); 
    const nextI = nextMonth.findIndex(({ day }) => day === 1); 
        
        const arr = [...prevMonth.slice(prevI), ...currentMonth, ...nextMonth.slice(0, nextI)]
        return arr.length < 42 ? [...prevMonth.slice(prevI), ...currentMonth, ...nextMonth.slice(0, nextI + 7)] : arr;
    }


       useEffect(() => {
           window.localStorage.setItem("date", JSON.stringify(date));
           window.localStorage.setItem("data", JSON.stringify(data));
         setDays(getDaysArr(date))
    }, [date, data])
  
    

    const onSubmit = (obj) => {
        setData(prev => [...prev, obj])
        closeForm();
    }

    const openTask = (id) => {
        const task = data.filter(item => item.id === id);
        task.map(item => setValues(item));
        setFormIsOpen(true);
        setOpenEdit(true);
    }

      const onEdit = (obj) => {
          setData(prev => prev.map((item) => {
              if (item.id === obj.id) {
                  return obj;
                }
          return item;
          }))
          closeForm();
    }

    const closeForm = () => {
        setValues({ title: '', description: '', date: formattedDateTime(today), });
        setFormIsOpen(false);
        setOpenEdit(false)
    }

    const openForm = (currentDay) => {
        setFormIsOpen(true)
        setValues(prev => ({...prev, date: formattedDateTime(currentDay)}))
    }

    const deleteTask = (id) => {
        setData(prev => prev.filter(item => item.id !== id));
        closeForm();
    }
  

  return (
    <>
      <Calendar openForm={() => setFormIsOpen(true)} date={date} prevMonth={prevMonth} nextMonth={nextMonth} handleClick={changeMonth}
      prevYear={prevYear} nextYear={nextYear}/>
      <Modal
          isOpen={formIsOpen}
        onRequestClose={closeForm}
        className="modal"
        overlayClassName="overlay">
        <TaskForm onSubmit={onSubmit} initialValues={values} onEdit={onEdit} openEdit={openEdit} onDelete={deleteTask} closeForm={closeForm} />
       </Modal>
       <DayList days={days} currentDay={today} data={data} openTask={openTask} openForm={openForm} date={date} />
    </>
  )
}

export default App
