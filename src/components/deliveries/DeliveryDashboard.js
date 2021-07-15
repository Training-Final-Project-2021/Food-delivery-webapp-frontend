import React from 'react';
import { Link } from 'react-router-dom';

function DeliveryDashboard(props) {
    return (
        <div>
            <h1>{props.delivery.messages}</h1>
            <p>delivery email: {props.delivery.email}</p>
            <p>delivery name: {props.delivery.name}</p>
            <p>Go to my profile &emsp;
                <Link to="/deliveries/profile">
                    <button className="btn btn-secondary">Profile</button>
                </Link>
            </p>
            
        </div>
    )
}

export default DeliveryDashboard;
