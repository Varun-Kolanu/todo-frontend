import React, { useContext } from 'react'
import { Context } from '../main'
import { Loader } from '../components/Loader';
import { Navigate } from 'react-router-dom';

export const Profile = () => {
    const { user, loading} = useContext(Context);
    return (
        loading? <Loader/>:
        <div>
            <h1>Name: {user?.username}</h1>
            <p>Email: {user?.email}</p>
        </div>
    )
}
