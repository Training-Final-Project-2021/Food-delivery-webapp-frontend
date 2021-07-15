import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function HotelProfile(props) {
    const history = useHistory();
    const handleLogout = () => {
        axios.delete('http://localhost:3030/v1/hotels/sign_out', {headers: {"AUTH-TOKEN" :localStorage.getItem("hotel_auth_token")}})
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
                                <p>See all orders status</p>
                                <Link to="/hotels/order_status">
                                    <button type="button" className="btn btn-primary">View</button>
                                </Link>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="h-80 p-4 m-5  rounded-3 text-white bg-dark">
                                <p>Confirm Customer order</p>
                                <Link to="/hotels/confirm">
                                    <button type="button" className="btn btn-primary">Confirm</button>
                                </Link>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="h-80 p-4 m-5  rounded-3 text-white bg-dark">
                                <p>Ready to deliver order, assign delivery</p>
                                <Link to="/hotels/assign">
                                    <button type="button" className="btn btn-primary">Assign</button>
                                </Link>
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

export default HotelProfile
