import React, { useState, useEffect } from 'react'
import Footer from './Footer'
import Header from './Header'
import Home from './Home'
import { Switch, Route } from 'react-router-dom'
import axios from 'axios';

import CustomerLogin from './customers/CustomerLogin'
import CustomerRegistration from './customers/CustomerRegistrations'
import CustomerDashboard from './customers/CustomerDashboard'

import HotelLogin from './hotels/HotelLogin'
import HotelRegistration from './hotels/HotelRegistrations'
import HotelDashboard from './hotels/HotelDashboard'

import DeliveryLogin from './deliveries/DeliveryLogin'
import DeliveryRegistration from './deliveries/DeliveryRegistrations'
import DeliveryDashboard from './deliveries/DeliveryDashboard'

import AdminLogin from './admins/AdminLogin'
import AdminDashboard from './admins/AdminDashboard'

function Main() {
    const [state, setState] = useState({
        login_status: false,
        email: "",
        name: "",
        auth_token: "",
        messages: ""
    })

    const handleLogin = (data) => {
        setState({ ...state, login_status:data.logged_in, email: data.customer.email, name: data.customer.name, auth_token: data.customer.authentication_token, messages: data.messages })
        localStorage.setItem('auth_token', data.customer.authentication_token)
        localStorage.setItem('user_type', data.user_type)
    }

    const handleLogout = () => {
        setState({auth_token: null})
        localStorage.setItem('auth_token', null)
        localStorage.setItem('user_type', null)
    }
    
    useEffect(() => {
        const auto_login_customer = () => {
            axios.get('http://localhost:3030/v1/customers/is_logged_in', { headers: {'AUTH-TOKEN': localStorage.getItem("auth_token")} })
              .then(response => {
                if (response.data.is_success) {
                  handleLogin(response.data)
                } else {
                  setState({...state, messages: response.data.messages })
                }
              })
              .catch(error => console.log('api errors:', error)
            )
        }
    
        const auto_login_hotel = () => {
            axios.get('http://localhost:3030/v1/hotels/is_logged_in', { headers: {'AUTH-TOKEN': localStorage.getItem("auth_token")} })
              .then(response => {
                if (response.data.is_success) {
                  handleLogin(response.data)
                } else {
                  setState({...state, messages: response.data.messages })
                }
              })
              .catch(error => console.log('api errors:', error)
            )         
        }
    
        const auto_login_delivery = () => {
            axios.get('http://localhost:3030/v1/deliveries/is_logged_in', { headers: {'AUTH-TOKEN': localStorage.getItem("auth_token")} })
              .then(response => {
                if (response.data.is_success) {
                  handleLogin(response.data)
                } else {
                  setState({...state, messages: response.data.messages })
                }
              })
              .catch(error => console.log('api errors:', error)
            )         
        }
    
        const user_type = localStorage.getItem("user_type")
        // console.log(user_type);
        // console.log(localStorage.getItem("auth_token"))
        if(user_type) {
            if(user_type === "customer") {
                auto_login_customer();
            } else if(user_type === "hotel") {
                auto_login_hotel();
            } else if(user_type === "delivery") {
                auto_login_delivery();
            } else return;
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            
            <Header login_status={state.login_status} handleLogout={handleLogout} auth_token={state.auth_token}/>
            
            <Switch>
                <Route exact path='/' component={() => <Home login_status = {state.login_status} />} />
                <Route exact path='/admins/sign_in' component={() => <AdminLogin handleLogin={handleLogin} />} />
                <Route exact path='/admins/dashboard' component={() => <AdminDashboard customer={state} />} />
                <Route exact path='/customers/sign_in' component={() => <CustomerLogin handleLogin={handleLogin} />} />
                <Route exact path='/customers/sign_up' component={() => <CustomerRegistration handleLogin={handleLogin} />} />
                <Route exact path='/customers/dashboard' component={() => <CustomerDashboard customer={state} />} />
                <Route exact path='/hotels/sign_in' component={() => <HotelLogin handleLogin={handleLogin} />} />
                <Route exact path='/hotels/sign_up' component={() => <HotelRegistration handleLogin={handleLogin} />} />
                <Route exact path='/hotels/dashboard' component={() => <HotelDashboard customer={state} />} />
                <Route exact path='/deliveries/sign_in' component={() => <DeliveryLogin handleLogin={handleLogin} />} />
                <Route exact path='/deliveries/sign_up' component={() => <DeliveryRegistration handleLogin={handleLogin} />} />
                <Route exact path='/deliveries/dashboard' component={() => <DeliveryDashboard customer={state} />} />
            </Switch>
            <Footer />
        </div>
    )
}

export default Main
