import { useLazyQuery, useMutation } from '@apollo/client';
import React from 'react';
import { useHome } from '../App';
import {DELETE_POST} from '../Apollo/user-apollo'
import { useParams } from 'react-router-dom';
import { GET_ALL_USERS } from '../Apollo/admin-apollo';

const Post = () => {
    const {userUnique} = useParams()

    const {posts, setPosts, setUsers} = useHome()

    const [deleteFunc, {data, loading, error}] = useMutation(DELETE_POST)
    const [getAllUsers, {data: from}] = useLazyQuery(GET_ALL_USERS)

    async function DeleteFunc(userUnique, id){
        const { data } = await deleteFunc({variables: {input: {userUnique, id}}})
        const {data: result} = await getAllUsers()
        console.log(result.getAllUsers)
        setUsers(result.getAllUsers)
        setPosts(data.deletePost.posts)
    }

    return (
        <div className='h-[100%] overflow-y-scroll overflow-x-hidden scroll-smooth w-[400px]'>
            {
                posts?.map((item, index) => {
                    return <div key={index}
                        className="flex flex-col items-center w-full max-h-auto min-h-[180px] p-3 my-3 text-white bg-red-500 rounded-lg justify-evenly "
                    >
                        <div className='flex flex-col items-start justify-center w-full max-h-auto'>
                            <h3 className='text-4xl'>{item.title}</h3>
                            <p className='text-xl'>{item.body}</p>
                        </div>
                        <div className='flex items-center w-full mt-2 justify-evenly'>
                            <button className='px-5 py-2 text-xl text-black bg-white rounded-lg active:scale-95' 
                            onClick={async() => await DeleteFunc(userUnique, item.id)}>Delete</button>
                            <div className='flex flex-row items-center justify-evenly w-[60%]'>
                                <h4>{item.date}</h4>
                                <h4>{item.time}</h4>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    );
}

export default Post;
