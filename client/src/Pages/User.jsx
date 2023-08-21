import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Home from '../Forms/Home';
import One from '../Forms/One';
import Posts from '../Forms/Posts';

const User = () => {
    return (
        <div className='flex flex-col items-center w-screen h-screen justify-evenly'>
            <div className='w-[80%] h-[55px] flex items-center justify-evenly bg-slate-500 text-white rounded-lg text-xl'>
                <Link to="/" className='text-white active:text-blue-500'>Home</Link>
                <Link to="/posts" className='text-white active:text-blue-500'>Posts</Link>
            </div>
            <div className='w-[80%] h-[660px] flex flex-col items-center justify-center bg-slate-500 rounded-lg text-white text-xl overflow-y-scroll'>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/posts" element={<Posts/>}/>
                    <Route path="/posts/:id" element={<One/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default User;
