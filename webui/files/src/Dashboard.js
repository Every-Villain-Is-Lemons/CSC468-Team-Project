import React, { Component } from 'react';

export class Dashboard extends Component{
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
    </div>
}