import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardFooter, CardHeader, CardImg, CardText, CardTitle } from 'reactstrap';

function RenderMenu(props) {

    const [ state, setState ] = useState({
        items_list: [],
        hotel_id: props.hotel_id,
        item_id: "",
        item_quantity: "",
        item_name: "",
        item_price: "",
        rating: "",
        messages: ""
    })

    useEffect(() => {
        const url = `http://localhost:3030/v1/hotels/show_menu?hotel_id=${state.hotel_id}`
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

    const handleItemClick = (itemId, itemName, itemPrice) => {
        setState({...state, item_id: itemId, item_name: itemName, item_price:itemPrice })
        const { hotel_id, item_quantity} = state
        let total_price = parseInt(item_quantity) * parseInt(itemPrice);
        let cart = {
            item_id: itemId,
            hotel_id: hotel_id,
            item_name: itemName,
            item_price: itemPrice,
            item_quantity: item_quantity,
            total_price: total_price
        }
        axios.post('http://localhost:3030/v1/customers/add_to_cart', { cart }, {headers: {"AUTH-TOKEN" :localStorage.getItem("auth_token")}} )
            .then(response => {
                if (response.data.is_success) {
                    //console.log(response.data.hotels);
                    setState({ ...state, messages: response.data.messages })
                }
            })
            .catch(error => console.log('api errors:', error))
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
                        <CardText>Category: {item.category}</CardText>
                        <CardText>Price: {item.price} Rs.</CardText>
                        <CardText>Description: {item.discription}</CardText>
                        <CardText>Rating: {item.rating}</CardText>
                        <form>
                            <div className="form-group text-left">
                                <input type="text"
                                    className="form-control"
                                    name="item_quantity"
                                    placeholder="Quantity (1-10)"
                                    value={state.item_quantity}
                                    onChange={(e) => setState({...state, item_quantity: e.target.value})}
                                />
                                <br/>
                            </div>
                        </form>
                        <button className="btn btn-primary" value={item.id} onClick={()=>handleItemClick(item.id, item.name, item.price)}>Add to cart</button>
                    </CardFooter>
                </Card>
            </div >
        )
    }

    return (
        <div>
            <h2>Menu for hotel id = {state.hotel_id}</h2>
            {RenderMenu()}
            <h2>message: {state.messages}</h2>
        </div>
    )
}

export default RenderMenu;
