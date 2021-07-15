import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DeliveryOrderStatus() {
    const [state, setState] = useState({
        orders: []
    })

    useEffect(() => {
        axios.get('http://localhost:3030/v1/deliveries/fetch_ready_orders', { headers: { "AUTH-TOKEN": localStorage.getItem("delivery_auth_token") } })
            .then(response => {
                //console.log(response.data.orders);
                if (response.data.is_success) {
                    setState({ ...state, orders: response.data.orders })
                }
            })
            .catch(error => console.log('api errors:', error)
            )

        // eslint-disable-next-line
    }, [])

    const ordersTable = () => {
        return (
            <div>
                <br/>
                <div className="card mx-5">
                    <h3 className="card-header bg-dark text-white mx-2">Ready Orders List</h3>
                    <div className="card-body">
                        <table className="table table-striped table-hover table-sm">
                            <thead>
                                <tr>
                                    <th>Order Id</th>
                                    <th>Customer Id</th>
                                    <th>Hotel Id</th>
                                    <th>Item Id</th>
                                    <th>Item Name</th>
                                    <th>Item Quantity</th>
                                    <th>Item Price</th>
                                    <th>Total Price</th>
                                    <th>Order Status</th>
                                    <th>Order Date and Time</th>
                                </tr>
                            </thead>
                    
                            <tbody>
                                {state.orders.map(order => {
                                    return (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.customer_id}</td>
                                            <td>{order.hotel_id}</td>
                                            <td>{order.item_id}</td>
                                            <td>{order.item_name}</td>
                                            <td>{order.item_quantity}</td>
                                            <td>{order.item_price}</td>
                                            <td>{order.total_price}</td>
                                            <td>{order.status}</td>
                                            <td>{order.created_at}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        )
    }

    return (
        <div>
            <Link to="/deliveries/profile">
                <button className="btn btn-primary">Back</button>
            </Link>
            {ordersTable()}
        </div>
    )
}

export default DeliveryOrderStatus
