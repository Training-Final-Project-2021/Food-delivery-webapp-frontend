import React from 'react'

function HotelDashboard(props) {
    return (
        <div>
            <h1>{props.hotel.messages}</h1>
            <p>hotel email: {props.hotel.email}</p>
            <p>hotel name: {props.hotel.name}</p>
        </div>
    )
}

export default HotelDashboard;
