import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHome } from '../App';
import {CHANGE_POST} from '../Apollo/user-apollo'
import { useMutation } from '@apollo/client';

const One = () => {

    const {one, setOne, user, setUser} = useHome()

    const [mood, setMood] = useState(false)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const [changeFunc, {data, loading, error}] = useMutation(CHANGE_POST)

    async function ChangeFunc(userUnique, id, title, body){
        const {data} = await changeFunc({variables: {input: {userUnique, id, title, body}}})
        const forOne = data.changePost.posts.find(item => item.id === one.id)
        console.log(data)
        setUser(data.changePost)
        setOne(forOne)
    }

    if(!mood){
        return <div>
        <h3>{one.title}</h3>
        <h3>{one.body}</h3>
        <h3>{one.date}</h3>
        <h3>{one.time}</h3>
        <h3>{one.id}</h3>
        <button onClick={() => setMood(true)}>Edit</button>
        <Link to='/posts' onClick={() => setOne({})}>Back</Link>
    </div>
    }
    else if(mood){
        return <div className="text-black">
            <input type="text" placeholder='Emile' value={title} onChange={ev => setTitle(ev.target.value)}
                className=' w-[250px] h-[40px] px-3 text-2xl rounded-lg outline-none border-2 border-transparent focus:border-black'
            />
            <input type="text" placeholder='Emile' value={body} onChange={ev => setBody(ev.target.value)}
                className='w-[250px] h-[40px] px-3 text-2xl rounded-lg outline-none border-2 border-transparent focus:border-black'
            />
            <button onClick={async () => {
                await ChangeFunc(user.userUnique, one.id, title, body)
                setMood(false)
            }}>Done</button>
        </div>
    }
}

export default One;
