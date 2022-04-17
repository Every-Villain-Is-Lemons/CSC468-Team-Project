import React, { Component } from "react";
//import goku from './goku.jpg'
//<img src={goku} className="Goku Image" width={400} height={250} align='right' alt='goku'/>
import { LeaderboardTable } from "./LeaderboardTable";
//import { CoinGraph } from './CoinGraph';
import pc from './pie_chart.jpg'
import lg from './line_graph.jpg'


export default class UserPage extends Component{
    render = () =>
        <div>
                <h1 className="bg-primary p-4 text-white">User's Gokoin's profile</h1>
                <table className="table table-bordered">
                        <thead>
                                <tr>
                                        <th><button>User's Profile</button></th>
                                        <th><button>User's Data</button></th>
                                        <th><button>Other User's</button></th>
                                </tr>
                        </thead>
                </table>

                <h4 align='left'>Amount of coins mined: - </h4>
                <h4 align='right'>Need a speed boost?</h4>

                <h4 align='left'>Time spent mining: - </h4>

                <img src={lg} className="Line Graph Image" width={400} height={250} align='left' alt='goku'/>
                <img src={pc} className="Pie Chart Image" width={400} height={250} align='right' alt='goku'/>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <LeaderboardTable/>
        </div>
}