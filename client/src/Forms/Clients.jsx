import React from 'react';
import {GET_ALL_USERS} from '../Apollo/admin-apollo'
import { useLazyQuery } from '@apollo/client';
import { useHome } from '../App';
import { Link } from 'react-router-dom';
import {DELETE_USER} from '../Apollo/admin-apollo'

const Clients = () => {

    const {users, setUsers, setPosts} = useHome()
    const [deleteUser, {}] = useLazyQuery(DELETE_USER)
    

    async function DeleteUser(userUnique){
        const {data} = await deleteUser({variables: {input: {userUnique}}})

        setUsers(data.deleteUser)
    }


    return (
        <div className="text-white">
            {
                users?users.map((item, index) => {
                    return <div key={index} 
                        className="flex items-center justify-evenly flex-row w-[200px] h-[80px] bg-white rounded-lg my-3 text-black"
                        onClick={() => setPosts(item.posts)}
                    >
                        <Link to={`/${item.userUnique}`} className='text-4xl'>{item.emile}</Link>
                        <div>
                            <button onClick={async () => await DeleteUser(item.userUnique)}>Delete User</button>
                            <h3>Status: {item.status}</h3>
                        </div>
                        
                    </div>
                }):null
            }
        </div>
    );
}

export default Clients;
