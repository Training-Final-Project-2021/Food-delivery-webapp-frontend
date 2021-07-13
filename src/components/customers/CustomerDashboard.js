import React from 'react'

function CustomerDashboard(props) {
    return (
        <div>
            <h1>{props.customer.messages}</h1>
            <p>Customer email: {props.customer.email}</p>
            <p>Customer name: {props.customer.name}</p>
        </div>
    )
}

export default CustomerDashboard;
