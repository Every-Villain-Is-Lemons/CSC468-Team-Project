import React, { Component } from "react";
import { Dashboard } from "./Dashboard";


export default class UserPage extends Component{
    render = () =>
        <div>
                <Dashboard/>

                <h4 align='left'>Amount of coins mined: - </h4>
                <h4 align='right'>Need a speed boost?</h4>

                <h4 align='left'>Time spent mining: - </h4>

        </div>
}