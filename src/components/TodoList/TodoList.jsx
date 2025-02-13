import s from './TodoList.module.css'

const TodoList = ({data}) => {
  return (
    <ul>
          {data.map(({ title }) => 
              <li key={title}>
                  <p>{title}</p>    
          </li>)}
      
    </ul>
  )
}

export default TodoList
