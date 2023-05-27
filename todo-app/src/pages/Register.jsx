import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from "axios"
import { Context, server } from '../main'
import toast from "react-hot-toast"

export const Register = () => {

    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {isAuthenticated, setIsAuthenticated} = useContext(Context);
    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            const {data} = await axios.post(`${server}/users/new`, {
                username, email, password
            }, {
                headers: {
                    "Content-type": "application/json"
                },
                withCredentials: true,
            });            
            toast.success(data.message);
            setIsAuthenticated(true);
        } catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(false);
        }
    }

    if(isAuthenticated) return <Navigate to={"/"} />;
    return (
        <div id="register">
            <section>
                <form onSubmit={submitHandler} className='lrform'>
                    <input value={username} onChange={(e) => { setName(e.target.value) }} type="text" placeholder='Name' required className='lrinput'/>
                    <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='Email' required className='lrinput'/>
                    <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='Password' required className='lrinput'/>
                    <button type='submit' className="primaryBtn">Sign Up</button>
                    <h4>Or</h4>
                    <Link to={"/login"} style={{ textDecoration: 'none' }}> <span className='secondaryBtn'> Login</span></Link>
                </form>
            </section>
        </div>
    )
}
