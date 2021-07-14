import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardFooter, CardHeader, CardImg, CardText, CardTitle } from 'reactstrap';

function RenderMenu(props) {

    const [ state, setState ] = useState({
        items_list: [],
        hotel_id: props.hotel_id,
        item_id: ""
    })

    useEffect(() => {
        const url = `http://localhost:3030/v1/hotels/show_menu?hotel_id=${state.hotel_id}`
        console.log(url)
        axios.get(url)
            .then(response => {
                if (response.data.is_success) {
                    setState({ ...state, items_list: response.data.items })
                }
            })
            .catch(error => console.log('api errors:', error)
            )
            
            // eslint-disable-next-line
    }, [])

    const handleItemClick = (item_id) => {
        setState({...state, item_id: item_id})
        
    }

    const RenderMenu = () => {
        const items_list = state.items_list.map((item) => {
            return (
                <div key={item.id} className="col-12 col-md-5 m-1" >
                    {RenderItem(item)}
                </div>
            )
        })

        return (
            <div className="container">
                <br />
                <div className="row">
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {items_list}
                </div>
            </div>
        )

    }

    const RenderItem = (item) => {
        return (
            <div>
                <Card>
                    <CardHeader className="card-bg-dark">
                        <CardTitle className="text-white" >{item.name}</CardTitle>
                    </CardHeader>
                    <CardImg width="50%" src='https://recipes.timesofindia.com/thumb/msid-53109843,width-1600,height-900/53109843.jpg' alt={item.name} />
                    <CardFooter className="card-footer">
                        <CardText>Dish Name: {item.name}</CardText>
                        <CardText>Description: {item.discription}</CardText>
                        <CardText>Rating: {item.rating}</CardText>
                        <button className="btn btn-primary" value={item.id} onClick={()=>handleItemClick(item.id)}>Add to cart</button>
                    </CardFooter>
                </Card>
            </div >
        )
    }

    return (
        <div>
            <h2>Menu for hotel id = {state.hotel_id}</h2>
            {RenderMenu()}
        </div>
    )
}

export default RenderMenu;
