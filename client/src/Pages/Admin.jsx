import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Clients from '../Forms/Clients';
import OnePost from '../Forms/OnePost';
import Post from '../Forms/Post';

const Admin = () => {

    return (
        <div className='flex flex-col items-center w-screen h-screen font-sans text-white bg-white justify-evenly'>
            <div className='w-[80%] h-[55px] bg-black flex items-center justify-center rounded-lg'>
                <Link to="/">Users</Link>
            </div>
            <div className='w-[80%] h-[670px] bg-black rounded-lg flex items-center justify-center'>
                <Routes>
                    <Route path='/' element={<Clients/>}/>
                    <Route path="/:userUnique" element={<Post/>}/>
                    <Route path="/:userUnique/:id" element={<OnePost/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default Admin;
