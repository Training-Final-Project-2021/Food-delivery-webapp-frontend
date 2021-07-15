import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function AdminProfile(props) {
    const history = useHistory();
    const handleLogout = () => {
        axios.delete('http://localhost:3030/v1/admins/sign_out', {headers: {"AUTH-TOKEN" :localStorage.getItem("admin_auth_token")}})
            .then(() => {
              props.handleLogout()
              history.push('/')
            })
            .catch(error => console.log(error))
    }
    
    return (
        <div>
            <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <div className="h-80 p-4 m-5  rounded-3 text-white bg-dark">
                                <p>Verify Hotels</p>
                                <button type="button" className="btn btn-primary">View</button>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="h-80 p-4 m-5  rounded-3 text-white bg-dark">
                                <p>Verify delivery User</p>
                                <button type="button" className="btn btn-primary">Deliver</button>
                            </div>
                        </div>

                        <div className="col-12 col-md-4 align-self-center">
                            <div className="h-80 p-4 m-5 border border-3 rounded-3 text-white bg-secondary">
                                <p>Sign out</p>
                                <button type="button" className="btn btn-primary" onClick={handleLogout}><span className="fa fa-sign-out fa-lg"></span></button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default AdminProfile
