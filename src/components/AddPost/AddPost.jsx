
import { useEffect, useState } from 'react'
import UserBar from '../UserBar/UserBar'
import s from './AddPost.module.css'

const AddPost = () => {
    const [symbol, setSymbol] = useState(0)
    const [value, setValue] = useState('')

    const counter = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        setSymbol(value.split(' ').join('').trim().length) 
    }, [value])
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.elements.post.value.trim());
        setValue('');
    }

  return (
    <div className={s.container}>
          <UserBar counter={symbol} />
              <form onSubmit={handleSubmit}>
                  <textarea name='post' onChange={counter} value={value}/>
              <button type='submit'>submit</button>
              </form>
    </div>
  )
}

export default AddPost
