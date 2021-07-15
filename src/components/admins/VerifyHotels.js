import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function VerifyHotels() {
    const [state, setState] = useState({
        hotels: []
    })

    useEffect(() => {
        axios.get('http://localhost:3030/v1/admins/unverified_hotels', { headers: { "AUTH-TOKEN": localStorage.getItem("admin_auth_token") } })
        .then(response => {
            //console.log(response.data.orders);
            if (response.data.is_success) {
                setState({ ...state, hotels: response.data.hotels })
            }
        })
        .catch(error => console.log('api errors:', error)
        )

        // eslint-disable-next-line
    }, [])

    const handleVerify = (hotel_id) => {
        const url = `http://localhost:3030/v1/admins/verify_hotel`
        axios.put(url, { hotel_id }, { headers: { "AUTH-TOKEN": localStorage.getItem("admin_auth_token") } })
            .then(response => {
                //console.log(response.data.orders);
                if (response.data.is_success) {
                    //setState({ ...state, orders: response.data.orders })
                }
            })
            .catch(error => console.log('api errors:', error)
        )
    }


    const hotelsTable = () => {
        return (
            <div>
                <br/>
                <div className="card mx-5">
                    <h3 className="card-header bg-dark text-white mx-2">Hotels List</h3>
                    <div className="card-body">
                        <table className="table table-striped table-hover table-sm">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Email</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Status</th>
                                    <th>Verify</th>
                                </tr>
                            </thead>
                    
                            <tbody>
                                {state.hotels.map(hotel => {
                                    return (
                                        <tr key={hotel.id}>
                                            <td>{hotel.id}</td>
                                            <td>{hotel.email}</td>
                                            <td>{hotel.name}</td>
                                            <td>{hotel.address}</td>
                                            <td>{hotel.status}</td>
                                            {
                                                hotel.status === "Unverified" ?
                                                <td>
                                                    <button className="btn btn-primary" onClick={() => handleVerify(hotel.id) }>Verify</button>
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
            {hotelsTable()}
        </div>
    )
}

export default VerifyHotels
