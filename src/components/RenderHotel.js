import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardFooter, CardHeader, CardImg, CardText, CardTitle } from 'reactstrap';
import RenderMenu from './RenderMenu';

function RenderHotel() {
    const [ state, setState ] = useState({
        hotels_list: [],
        hotel_id: "",
        hotelClick: false
    })

    const getData = () => {
        axios.get('http://localhost:3030/v1/hotels/hotels_list')
            .then(response => {
                if (response.data.is_success) {
                    //console.log(response.data.hotels);
                    setState({ ...state, hotels_list: response.data.hotels })
                }
            })
            .catch(error => console.log('api errors:', error)
        )
    }

    useEffect(() => {
        getData()
         // eslint-disable-next-line
    }, [])

    const handleHotelClick = (hotel_id) => {
        setState({ ...state, hotel_id: hotel_id, hotelClick: !state.hotelClick })
        // console.log('clicked hotel id = ',hotel_id);
        // console.log('state hotel id = ',state.hotel_id);
        //props.setHotelId(state.hotel_id)
        //props.handleItemClick(!props.itemClick)
    }

    const RenderHotel = (hotel) => {
        return (
            <div>
                <Card>
                    <CardHeader className="text-white bg-dark">
                        <CardTitle className="text-white" >{hotel.name}</CardTitle>
                    </CardHeader>
                    <CardImg width="20%" src='https://media-cdn.tripadvisor.com/media/photo-s/01/e9/31/4e/restaurant2.jpg' alt={hotel.name} />
                    <CardFooter className="card-footer">
                        <CardText>Hotel Name: {hotel.name}</CardText>
                        <CardText>Address: {hotel.address}</CardText>
                        <CardText>Description: {hotel.description}</CardText>
                        <CardText>Rating: {hotel.rating}</CardText>
                        <button className="btn btn-primary" value={hotel.id} onClick={()=>handleHotelClick(hotel.id)}>Get Menu</button>
                    </CardFooter>
                </Card>
            </div >
        )
    }

    const HotelsList = () => {
        const hotels_list = state.hotels_list.map((hotel) => {
            return (
                <div key={hotel.id} className="col-12 col-md-3 m-1" >
                    {RenderHotel(hotel)}
                </div>
            )
        })

        return (
            <div className="container">
                <br />
                <div className="row">
                    <div className="col-12">
                        <h3>Hotels Available</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {hotels_list}
                </div>
            </div>
        )
    }

    return (
        <div>       
            {HotelsList()}
            {
                state.hotelClick ?
                <div>
                    <RenderMenu hotel_id = {state.hotel_id} />
                    <button className="btn btn-primary" onClick={()=> setState({...state, hotelClick: !state.hotelClick})}>Hide Menu</button>
                </div> : null
            }
        </div>
    )
}

export default RenderHotel;
