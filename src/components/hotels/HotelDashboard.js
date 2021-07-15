import React from 'react';
import { Link } from 'react-router-dom';

function HotelDashboard(props) {
    return (
        <div>
            <h1>{props.hotel.messages}</h1>
            <p>hotel email: {props.hotel.email}</p>
            <p>hotel name: {props.hotel.name}</p>
            <p>Go to my profile &emsp;
                <Link to="/hotels/profile">
                    <button className="btn btn-secondary">Profile</button>
                </Link>
            </p>
        </div>
    )
}

export default HotelDashboard;
