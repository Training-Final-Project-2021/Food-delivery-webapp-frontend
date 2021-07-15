import React, {useState} from 'react';
import RenderHotel from '../RenderHotel';
import {Link} from 'react-router-dom';

//import axios from 'axios';

function CustomerDashboard(props) {

    const [ state, setState ] = useState({
        hotel_id: "",
        hotelClick: false,
        itemClick: false
    })

    const handleHotelClick = () => {
        setState({...state, hotelClick: !state.hotelClick})
    }

    // const handleItemClick = (value) => {
    //     setState({...state, itemClick: value})
    // }

    // const setHotelId = (hotel_id) => {
    //     setState({...state, hotel_id: hotel_id})
    // }

return (
    <div>
        <h1>{props.customer.messages}</h1>
        <p>Logged in as: {props.customer.email}</p>
        <p>Welcome: {props.customer.name}</p>
        <p>Go to my profile &emsp;
            <Link to="/customers/profile">
                <button className="btn btn-secondary">Profile</button>
            </Link>
        </p>
        <button className="btn btn-primary" onClick={handleHotelClick}>Show Hotels</button>
        {
            state.hotelClick ?
            <div>
                <RenderHotel />
            </div> : null
        }

    </div>
)
}

export default CustomerDashboard;
