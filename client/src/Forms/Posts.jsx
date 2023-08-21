import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHome } from '../App';
import { CREATE_POST, DELETE_POST } from '../Apollo/user-apollo.js'

const Posts = () => {

    const {user, setOne, one, setUser} = useHome()

    const [createPost, {data, loading, error}] = useMutation(CREATE_POST)
    const [deleteFunc, {}] = useMutation(DELETE_POST)

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    async function CreatePost(userUnique, title, body){
        console.log(user.userUnique)
        const { data } = await createPost({variables: {input: {userUnique, title, body}}})

        setUser({emile: user.emile, password: user.password, userUnique, postID: user.postID, status: user.status, posts: data.createPost.posts})
        
    }
    async function DeletePost(userUnique, id){
        const { data } = await deleteFunc({variables: {input: {userUnique, id}}})
        
        setUser({emile: user.emile, password: user.password, userUnique, postID: user.postID, status: user.status, posts: data.deletePost.posts})
    }
    
    return (
        <div className='flex flex-col items-center justify-start w-full h-full'>
            <div className='flex flex-col items-center justify-evenly w-[350px] min-h-[250px] text-black'>
                <input type="text" placeholder="Title" onChange={ev => setTitle(ev.target.value)}/>
                <input type="text" placeholder='Body' onChange={ev => setBody(ev.target.value)}/>
                <button onClick={async () => await CreatePost(user.userUnique, title, body)}>Apply</button>
            </div>
            <div>
            {
                user?.posts.map((item, index) => {
                    return <div  className='w-[400px] min-h-[150px] rounded-lg flex items-start justify-start flex-col bg-blue-500 my-3 pl-3 pt-3' key={index}>
                        <h3 className='text-4xl'>{item.title}</h3>
                        <p>{item.body}</p>
                        <div className='flex flex-row items-center w-full justify-evenly'>
                            <Link to={`/posts/${item.id}`} className="px-6 py-3 mt-2 text-xl text-white transition ease-in-out bg-black rounded-lg active:scale-95"
                                onClick={() => setOne(item)}
                            >More</Link>
                            <button className='px-6 py-3 mt-2 text-xl text-white transition ease-in-out bg-black rounded-lg active:scale-95'
                                onClick={async() => await DeletePost(user.userUnique, item.id)}
                            >Delete</button>
                            <div className='flex flex-row items-end justify-evenly h-[55px] w-[150px]'>
                                <h4 className='text-lg text-black'>{item.date}</h4>
                                <h4 className='text-lg text-black'>{item.time}</h4>
                            </div>
                        </div>
                    </div>
                })
            }
            </div>
        </div>
    );
}

export default Posts;
