import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main'
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const Header = () => {
    const {isAuthenticated, setIsAuthenticated, loading, setLoading, setUser} = useContext(Context);
    const logoutHandler = async () => {
        setLoading(true);
        try {
            const {data} = await axios.get(`${server}/users/logout`, {
                withCredentials: true,
            });            
            toast.success(data.message);
            setIsAuthenticated(false);
            setLoading(false);
            setUser({});
        } catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(true);
            setLoading(false);
        }
    }
    return (
        <nav>
            <span id="logo">TODO APP.</span>
            <ul>
                <Link to={"/"} style={{ textDecoration: 'none' }}><li>Home</li></Link>
                {
                    isAuthenticated?<Link to={"/profile"} style={{ textDecoration: 'none' }}><li>Profile</li></Link>:<div></div>
                }
                {
                    isAuthenticated? <button onClick={logoutHandler} disabled={loading} id='logout'>Logout</button>: <Link to={"/login"} style={{ textDecoration: 'none' }}><li>Login</li></Link>
                }
            </ul>
        </nav>
    )
}
