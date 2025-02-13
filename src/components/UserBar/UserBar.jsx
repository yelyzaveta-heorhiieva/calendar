import { HiDotsHorizontal } from 'react-icons/hi'
import avatar from '../../assets/avatar.png'
import s from './UserBar.module.css'


const UserBar = ({counter}) => {
  return (
    <div className={s.container}>
        <a href="#"><img src={avatar} alt="" /></a>
        <div>
            <p>Створення поста</p>
            <input type="text" />
        </div>
        <div className={s.bar}>
              <p>Символів: {counter}</p>
            <button type='button'><HiDotsHorizontal/></button>
        </div>
    </div>
  )
}

export default UserBar
