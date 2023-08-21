import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import './App.css'
import Login from './Forms/Login'
import Regis from './Forms/Regis'
import Admin from './Pages/Admin'
import User from './Pages/User'

const Application = React.createContext()

export function useHome(){
  return useContext(Application)
}

function App() {

  const [socket, setSocket] = useState(new WebSocket('ws://localhost:3500'))
  const [elem, setElem] = useState(<Regis/>)
  const [user, setUser] = useState({})
  const [one, setOne] = useState({})
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])

  socket.onopen = () => {
    console.log('connected!')
  }

  let base = <div className='flex flex-col items-center justify-center w-screen h-screen'>
    <div className='flex flex-row items-center justify-evenly w-[220px] h-auto mb-2'>
      <button onClick={() => setElem(<Regis/>)}
        className='px-6 py-3 mt-2 text-xl text-white transition ease-in-out bg-black rounded-lg active:scale-95'
      >Regis</button>
      <button onClick={() => setElem(<Login/>)}
        className='px-6 py-3 mt-2 text-xl text-white transition ease-in-out bg-black rounded-lg active:scale-95'
      >Login</button>
    </div>
    {elem}
  </div>

  if(user?.status === 'USER'){
    base = <User/>
  }
  else if(user?.status === 'ADMIN'){
    base = <Admin/>
  }

  return (
    <Application.Provider value={{user, setUser, one, setOne, users, setUsers, posts, setPosts}}>
      {base}
    </Application.Provider>
  )
}

export default App
