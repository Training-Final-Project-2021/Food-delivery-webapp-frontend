import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function VerifyDeliveryPeople() {
    const [state, setState] = useState({
        delivery_people: []
    })

    useEffect(() => {      
        axios.get('http://localhost:3030/v1/admins/unverified_delivery_people', { headers: { "AUTH-TOKEN": localStorage.getItem("admin_auth_token") } })
        .then(response => {
            console.log(localStorage.getItem("admin_auth_token"));
            console.log(response.data.delivery_people);
            if (response.data.is_success) {
                setState({ ...state, delivery_people: response.data.delivery_people })
            }
        })
        .catch(error => console.log('api errors:', error)
        )

        // eslint-disable-next-line
    }, [])

    const handleVerify = (delivery_id) => {
        const url = `http://localhost:3030/v1/admins/verify_delivery_person`
        axios.put(url, { delivery_id }, { headers: { "AUTH-TOKEN": localStorage.getItem("admin_auth_token") } })
            .then(response => {
                //console.log(response.data.orders);
                if (response.data.is_success) {
                    //setState({ ...state, orders: response.data.orders })
                }
            })
            .catch(error => console.log('api errors:', error)
        )
    }


    const deliveryTable = () => {
        return (
            <div>
                <br/>
                <div className="card mx-5">
                    <h3 className="card-header bg-dark text-white mx-2">Delivery People List</h3>
                    <div className="card-body">
                        <table className="table table-striped table-hover table-sm">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Email</th>
                                    <th>Name</th>
                                    <th>Phone Number</th>
                                    <th>Status</th>
                                    <th>Verify</th>
                                </tr>
                            </thead>
                    
                            <tbody>
                                {state.delivery_people.map(delivery => {
                                    return (
                                        <tr key={delivery.id}>
                                            <td>{delivery.id}</td>
                                            <td>{delivery.email}</td>
                                            <td>{delivery.name}</td>
                                            <td>{delivery.phone_no}</td>
                                            <td>{delivery.status}</td>
                                            {
                                                delivery.status === "Unverified" ?
                                                <td>
                                                    <button className="btn btn-primary" onClick={() => handleVerify(delivery.id) }>Verify</button>
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
            <Link to="/admins/profile">
                <button className="btn btn-primary">Back</button>
            </Link>
            {deliveryTable()}
        </div>
    )
}

export default VerifyDeliveryPeople
