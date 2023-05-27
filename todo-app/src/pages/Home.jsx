import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context, server } from '../main';
import { toast } from 'react-hot-toast';
import { Task } from '../components/Task';
import { Navigate } from 'react-router-dom';

export const Home = () => {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [loading,setLoading] = useState(false);
    const [tasks,setTasks] = useState([]);
    const [refresh,setRefresh] = useState(false);
    const {isAuthenticated, setIsAuthenticated} = useContext(Context);
    const updateHandler = async (id) => {
        try {
            const {data} = await axios.put(`${server}/tasks/${id}`, {}, {
                withCredentials: true,
            });
            toast.success(data.message);
            setRefresh(prev => !prev)
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const deleteHandler = async (id) => {
        try {
            const {data} = await axios.delete(`${server}/tasks/${id}`, {}, {
                withCredentials: true,
            });
            toast.success(data.message);
            setRefresh(prev => !prev)
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    const submitHandler = async (e) => {
        try {
            setLoading(true);
            e.preventDefault();
            const {data} = await axios.post(`${server}/tasks/new`, {
                title, description
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setTitle("");
            setDescription("");
            toast.success(data.message);
            setLoading(false);
            setRefresh(prev => !prev)
        } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        axios.get(`${server}/tasks/myTasks`, {
            withCredentials: true,
        }).then(res => {
            setTasks(res.data.tasks);
        }).catch(e => {
            toast.error(e.response.data.message);
        })
    }, [refresh])

    if(!isAuthenticated) return <Navigate to={"/login"} />;
    return (
        <div id="home">
            <section>
                <form onSubmit={submitHandler} className='hform'>
                    <input value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" placeholder='Title' required />
                    <input value={description} onChange={(e) => { setDescription(e.target.value) }} type="text" placeholder='Description' required />
                    
                    <button type='submit' className='primaryBtn' disabled={loading}>
                        Add Task
                    </button>
                </form>
            </section>
            <section className="todosContainer">
                {
                    tasks.map(task => (
                        <Task task={task} updateHandler = {updateHandler} deleteHandler = {deleteHandler}/>
                    ))
                }
            </section>
        </div>
    )
}
