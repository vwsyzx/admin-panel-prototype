import React from 'react';
import { Link } from 'react-router-dom';
import { useHome } from '../App';

const Home = () => {
    const {user, setUser} = useHome()

    return (
        <div className='flex flex-col items-center justify-start w-full h-full'>
            <div className='flex flex-col items-center justify-start w-[80%] h-auto mt-4'>
                <Link className='text-5xl' to="/" onClick={() => setUser({})}>Back</Link>
                <h3 className='text-6xl'>{user.emile}</h3>
                <h3>userUnique: {user.userUnique}</h3>
                <h3>postID: {user.postID}</h3>
            </div>
        </div>
    );
}

export default Home;
