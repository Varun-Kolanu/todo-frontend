import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);
    if(isAuthenticated) return <Navigate to={"/"} />;

    const submitHandler = async (e) => {
        setLoading(true);
        try {
            e.preventDefault();
            const {data} = await axios.post(`${server}/users/login`, {
                email, password
            }, {
                headers: {
                    "Content-type": "application/json"
                },
                withCredentials: true,
            });            
            toast.success(data.message);
            setIsAuthenticated(true);
            setLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(false);
            setLoading(false);
        }
    }

    return (
        <div id="login">
            <section>
                <form onSubmit={submitHandler} className="lrform">
                    <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='Email' required className='lrinput'/>
                    <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='Password' required className='lrinput'/>
                    <button type='submit' className="primaryBtn" disabled={loading}>Login</button>
                    <h4>Or</h4>
                    <Link to={"/register"} style={{ textDecoration: 'none' }} className='secondaryBtn'> Sign Up</Link>
                </form>
            </section>
        </div>
    )
}
