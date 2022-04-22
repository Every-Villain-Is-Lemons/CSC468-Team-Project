import React from 'react';
import { Login } from './Login';
import { Signup } from './Signup';

export function StartPage(props) {
    if(!props.login) {
        return null;
    }

    return (
        <div className='Start Page'>
        <h1 className='text-white bg-primary'>Welcome to GoKoins!</h1>
        <button>Login</button>
        <Login/>

        <button>Signup</button>
        <Signup/>
        </div>
    );
}