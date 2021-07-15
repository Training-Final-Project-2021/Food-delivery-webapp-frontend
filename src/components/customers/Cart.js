import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardFooter, CardHeader, CardImg, CardText, CardTitle } from 'reactstrap';

function Cart() {

    const [ state, setState ] = useState({
        carts: [],
        status: "",
        messages: "hi"
    })

    useEffect(() => {
        axios.get('http://localhost:3030/v1/customers/show_cart', {headers: {"AUTH-TOKEN" :localStorage.getItem("customer_auth_token")}})
            .then(response => {
                if (response.data.is_success) {
                    setState({ ...state, carts: response.data.carts})
                }
            })
            .catch(error => console.log('api errors:', error)
            )
            
            // eslint-disable-next-line
    }, [])

    const handleCartClick = () => {
        axios.post('http://localhost:3030/v1/customers/create_order', {}, {headers: {"AUTH-TOKEN" :localStorage.getItem("customer_auth_token")}})
            .then(response => {
                if (response.data.is_success) {
                    setState({ ...state, messages: response.data.messages, carts: response.data.carts })
                }
            })
            .catch(error => console.log('api errors:', error))
    }

    const RenderCart = () => {
        const items_list = state.carts.map((cart) => {
            return (
                <div key={cart.id} className="col-12 col-md-3 m-1" >
                    {RenderItem(cart)}
                </div>
            )
        })

        return (
            <div className="container">
                <br />
                <div className="row">
                    {items_list}
                </div>
                <button className="btn btn-primary offset-4" onClick={handleCartClick}>PLace Order!</button>
            </div>
        )

    }

    const RenderItem = (cart) => {
        return (
            <div>
                <Card>
                    <CardHeader className="card-bg-dark">
                        <CardTitle className="text-white" >{cart.item_name}</CardTitle>
                    </CardHeader>
                    <CardImg width="50%" src='https://recipes.timesofindia.com/thumb/msid-53109843,width-1600,height-900/53109843.jpg' alt={cart.name} />
                    <CardFooter className="card-footer">
                        <CardText>Dish Name: {cart.item_name}</CardText>
                        <CardText>Quantity: {cart.item_quantity}</CardText>
                        <CardText>Total Price: {cart.total_price} Rs.</CardText>
                    </CardFooter>
                </Card>
            </div >
        )
    }

    return (
        <div>
            <h2>Your Cart</h2>
            {RenderCart()}
            <h2>message: {state.messages}</h2>
        </div>
    )
}

export default Cart;
