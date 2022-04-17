import React, { Component } from "react";

export class LeaderboardTable extends Component {
    render = () =>
        <div>
            <h3 className="bg-info text-white p-2">Leaderboard</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Coins</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <tb>1</tb>
                    </tr>
                    <tr>
                        <tb>2</tb>
                    </tr>
                    <tr>
                        <tb>3</tb>
                    </tr>
                </tbody>
            </table>
        </div>
}