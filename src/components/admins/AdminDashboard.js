import React from 'react'

function AdminDashboard(props) {
    return (
        <div>
            <h1>{props.admin.messages}</h1>
            <p>admin email: {props.admin.email}</p>
            <p>admin name: {props.admin.name}</p>
        </div>
    )
}

export default AdminDashboard;
