import React, { Component } from "react";

export class Login extends Component{
    render = () =>
        <form>
            <label>Enter username: </label>
            <input type='text' placeholder='Username...'></input> <br></br>
            <label>Enter password: </label>
            <input text='text' placeholder='Password...'></input> <br></br>
            <input type='submit' value='submit'/>
        </form>
}