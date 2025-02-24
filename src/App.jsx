import { useState,useEffect } from 'react'
import './App.css'
import Calendar from './components/Calendar/Calendar'
import DayList from './components/DayList/DayList';
import TaskForm from './components/TaskForm/TaskForm';
import Modal from 'react-modal';


const formattedDateTime = (newDate) => {
    const day = String(newDate.getDate()).padStart(2, '0');
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); 
    const year = newDate.getFullYear();
    const hours = String(newDate.getHours()).padStart(2, '0');
        const minutes = String(newDate.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year}, ${hours}:${minutes}`;
    }


function App() {
    const today = new Date();

    
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
    const [values, setValues] = useState({title: '', description: '', date: formattedDateTime(today), repeat: 'none'});
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
    
    const changeMonthYear = (step) => {
        setDate(prev => {
            const newMonth = prev.month + step;
            return {
                month: (newMonth + 12) % 12,
                year: prev.year + Math.floor(newMonth / 12),
            }
        })
    }

    const prevMonth = () => changeMonthYear(-1);
    const nextMonth = () => changeMonthYear(1);

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
         setDays(getDaysArr(date))
    }, [date])
  
     useEffect(() => {
           window.localStorage.setItem("data", JSON.stringify(data));
    }, [data])
    

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
        setValues({ title: '', description: '', date: formattedDateTime(today), repeat: 'none'});
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

    const moveTask = (taskId, newDate) => {
  setData(prev => prev.map(task =>
    task.id === taskId ? { ...task, date: newDate.toLocaleDateString('uk-UA') } : task
  ));
    };
    
    const reorderTasks = (startIndex, endIndex) => {
  setData(prev => {
    const result = [...prev];
      const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  });
};

  return (
    <>
      <Calendar openForm={() => setFormIsOpen(true)} date={date} prevMonth={prevMonth} nextMonth={nextMonth} handleClick={changeMonth}
      prevYear={prevYear} nextYear={nextYear}/>
      <Modal
          isOpen={formIsOpen}
        onRequestClose={closeForm}
        className="modal"
        overlayClassName="overlay">
              <TaskForm onSubmit={onSubmit} initialValues={values} onEdit={onEdit}
                  openEdit={openEdit} onDelete={deleteTask} closeForm={closeForm} />
       </Modal>
          <DayList days={days} currentDay={today} data={data} openTask={openTask} openForm={openForm} date={date} 
          moveTask={moveTask} reorderTasks={reorderTasks}/>
    </>
  )
}

export default App
