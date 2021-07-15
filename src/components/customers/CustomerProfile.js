import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function CustomerProfile(props) {
    const history = useHistory();
    const handleLogout = () => {
        axios.delete('http://localhost:3030/v1/customers/sign_out', {headers: {"AUTH-TOKEN" :localStorage.getItem("customer_auth_token")}})
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
                            <div className="h-80 p-4 m-5 text-white bg-dark rounded-3"> 
                                <p>Want to order food?<br/>Go to dashboard</p>
                                <Link to="/customers/dashboard">
                                    <button type="button" className="btn btn-primary">Order food</button>
                                </Link>
                                <br/><br/>
                                <p>Your Cart</p>
                                <Link to="/customers/cart">
                                    <button type="button" className="btn btn-primary"><span className="fa fa-shopping-cart fa-lg"></span></button>
                                </Link>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="h-80 p-4 m-5  rounded-3 text-white bg-dark">
                                <p>See your order status</p>
                                <Link to="/customers/order_status">
                                    <button type="button" className="btn btn-primary">View</button>
                                </Link>
                                <br/><br/>
                                <p>Your order history</p>
                                <Link to="/customers/order_history">
                                    <button type="button" className="btn btn-primary">History</button>
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

export default CustomerProfile
