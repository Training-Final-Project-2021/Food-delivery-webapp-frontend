import React from 'react'

function DeliveryDashboard(props) {
    return (
        <div>
            <h1>{props.delivery.messages}</h1>
            <p>delivery email: {props.delivery.email}</p>
            <p>delivery name: {props.delivery.name}</p>
        </div>
    )
}

export default DeliveryDashboard;
