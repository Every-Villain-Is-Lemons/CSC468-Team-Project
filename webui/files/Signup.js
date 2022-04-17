import React, { Component } from "react";

export class Signup extends Component{
    render = () =>
        <form className='Signup'>
            <input type='text' placeholder='First name...'></input>
            <input text='text' placeholder='Last name...'></input> <br></br>
            <input type='text' placeholder='Username...'></input> 
            <input type='text' placeholder='E-mail address...'></input> <br></br>
            <input text='text' placeholder='Password...'></input>
            <input text='text' placeholder=' Confirm password...'></input> <br></br>
            <input type='submit' value='submit'/>
        </form>
}