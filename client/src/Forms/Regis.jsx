import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import {REGIS} from '../Apollo/user-apollo'

const Regis = () => {

    const [emile, setEmile] = useState('')
    const [password, setPassword] = useState('')

    const [regisFunc, {data, loading, error}] = useMutation(REGIS)

    async function RegisFunc(emile, password){
        const {data} = await regisFunc({variables: {input: {emile, password}}})

        console.log(data)
    }
    let base
    if(loading){
        base = <h3>Loading!</h3>
    }
    else if(data){
        base = <h3 className='my-3 text-2xl text-white'>User SuccessFuly Registered!</h3>
    }
    else if(error){
        base = <h3 className='my-3 text-2xl text-white'>{error.message}</h3>
    }

    return (
        <div className='w-[350px] min-h-[250px] max-h-[350px] bg-blue-500 flex items-center justify-start flex-col rounded-lg font-sans'>
            <h3 className='mt-3 text-4xl text-white'>Regis</h3>
            <div className="flex flex-col items-center justify-evenly w-full h-[170px] mt-2">
                <input type="text" placeholder='Emile' value={emile} onChange={ev => setEmile(ev.target.value)}
                    className='w-[250px] h-[40px] px-3 text-2xl rounded-lg outline-none border-2 border-transparent focus:border-black'
                />
                <input type="text" placeholder='Password' value={password} onChange={ev => setPassword(ev.target.value)}
                    className='w-[250px] h-[40px] px-3 text-2xl rounded-lg outline-none border-2 border-transparent focus:border-black bg-white text-black'
                />
                <button className='px-6 py-3 mt-2 text-xl text-white transition ease-in-out bg-black rounded-lg active:scale-95'
                    onClick={async () => await RegisFunc(emile, password)}
                >Apply</button>
            </div>
            {base}
        </div>
    );
}

export default Regis;
