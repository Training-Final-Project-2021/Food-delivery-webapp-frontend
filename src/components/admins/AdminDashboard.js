import React from 'react'
import {Link} from 'react-router-dom';

function AdminDashboard(props) {
    return (
        <div>
            <h1>{props.admin.messages}</h1>
            <p>admin email: {props.admin.email}</p>
            <p>admin name: {props.admin.name}</p>
            <p>Go to my profile &emsp;
            <Link to="/admins/profile">
                <button className="btn btn-secondary">Profile</button>
            </Link>
        </p>
        </div>
    )
}

export default AdminDashboard;
