import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CustomerOrderStatus() {
    const [state, setState] = useState({
        orders: []
    })

    useEffect(() => {
        axios.get('http://localhost:3030/v1/customers/view_order_status', { headers: { "AUTH-TOKEN": localStorage.getItem("customer_auth_token") } })
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

    const handleCancelOrder = (order_id) => {
        const url = `http://localhost:3030/v1/customers/cancel_order?order_id=${order_id}`
        axios.delete(url, { headers: { "AUTH-TOKEN": localStorage.getItem("customer_auth_token") } })
        .then(response => {
            console.log(response.data.orders);
            if (response.data.is_success) {
               // setState({ ...state, orders: response.data.orders })
            }
        })
        .catch(error => console.log('api errors:', error)
        )
    }

    const ordersTable = () => {
        return (
            <div>
                <br/>
                <div className="card mx-5">
                    <h3 className="card-header bg-dark text-white mx-2">Your Orders status</h3>
                    <div className="card-body">
                        <table className="table table-striped table-hover table-sm">
                            <thead>
                                <tr>
                                    <th>Order Id</th>
                                    <th>Hotel Id</th>
                                    <th>Item Id</th>
                                    <th>Item Name</th>
                                    <th>Item Quantity</th>
                                    <th>Item Price</th>
                                    <th>Total Price</th>
                                    <th>Order Status</th>
                                    <th>Order Date and Time</th>
                                    <th>Cancel Orders</th>
                                </tr>
                            </thead>
                    
                            <tbody>
                                {state.orders.map(order => {
                                    return (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.hotel_id}</td>
                                            <td>{order.item_id}</td>
                                            <td>{order.item_name}</td>
                                            <td>{order.item_quantity}</td>
                                            <td>{order.item_price}</td>
                                            <td>{order.total_price}</td>
                                             
                                            {
                                                order.status === "Pending" ?
                                                    <td className="bg-info fw-bold">
                                                        {order.status}
                                                    </td> : 
                                                    order.status === "Confirmed" ?
                                                        <td className="bg-primary fw-bold">
                                                            {order.status}
                                                        </td> :
                                                        order.status === "Ready" ?
                                                            <td className="bg-secondary fw-bold">
                                                                {order.status}
                                                            </td> :
                                                            order.status === "Delivered" ?
                                                                <td className="bg-warning fw-bold">
                                                                    {order.status}
                                                                </td> :
                                                                order.status === "Received" ?
                                                                <td className="bg-success fw-bold">
                                                                    {order.status}
                                                                </td> : 
                                                                <td className="bg-danger fw-bold">
                                                                    {order.status}
                                                                </td>
                                                
                                            }

                                            <td>{order.created_at}</td>
                                            {
                                                order.status === "Pending" ?
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => handleCancelOrder(order.id) }>Cancel</button>
                                                </td> : null
                                            }
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
            <Link to="/customers/profile">
                <button className="btn btn-primary">Back</button>
            </Link>
            {ordersTable()}
        </div>
    )
}

export default CustomerOrderStatus
