import React from 'react';
import axios from 'axios';

function CustomerDashboard(props) {
    
    const renderHotels = () => {

    }

    const renderMenu = (hotel_id) => {

    }

    const renderItem = (item_id) => {

    }

    return (
        <div>
            <h1>{props.customer.messages}</h1>
            <p>Welcome: {props.customer.name}</p>

        </div>
    )
}

export default CustomerDashboard;
