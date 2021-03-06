import React, { useState, useEffect } from 'react'
import Footer from './Footer'
import Header from './Header'
import Home from './Home'
import { Switch, Route } from 'react-router-dom'
import axios from 'axios';

import CustomerLogin from './customers/CustomerLogin'
import CustomerRegistration from './customers/CustomerRegistrations'
import CustomerDashboard from './customers/CustomerDashboard'
import CustomerProfile from './customers/CustomerProfile'
import Cart from './customers/Cart'
import OrderHistory from './customers/OrderHistory'
import CustomerOrderStatus from './customers/CustomerOrderStatus'

import HotelLogin from './hotels/HotelLogin'
import HotelRegistration from './hotels/HotelRegistrations'
import HotelDashboard from './hotels/HotelDashboard'
import HotelProfile from './hotels/HotelProfile'
import OrderAssign from './hotels/OrderAssign'
import OrderConfirm from './hotels/OrderConfirm'
import OrderStatus from './hotels/OrderStatus'
import OrderConfirmation from './customers/OrderConfirmation'

import DeliveryLogin from './deliveries/DeliveryLogin'
import DeliveryRegistration from './deliveries/DeliveryRegistrations'
import DeliveryDashboard from './deliveries/DeliveryDashboard'
import DeliveryProfile from './deliveries/DeliveryProfile'
import DeliveryOrderStatus from './deliveries/DeliveryOrderStatus'
import Deliver from './deliveries/Deliver'

import AdminLogin from './admins/AdminLogin'
import AdminDashboard from './admins/AdminDashboard'
import AdminProfile from './admins/AdminProfile'
import VerifyHotels from './admins/VerifyHotels'
import VerifyDeliveryPeople from './admins/VerifyDeliveryPeople'


function Main() {
  const [state, setState] = useState({
    login_status: false,
    email: "",
    name: "",
    messages: ""
  })

  const handleCustomerLogin = (data) => {
    setState({ ...state, login_status: true, email: data.customer.email, name: data.customer.name, messages: data.messages })
    localStorage.setItem('customer_auth_token', data.customer.authentication_token)
    localStorage.setItem('user_type', data.user_type)
  }

  const handleHotelLogin = (data) => {
    setState({ ...state, login_status: true, email: data.hotel.email, name: data.hotel.name, messages: data.messages })
    localStorage.setItem('hotel_auth_token', data.hotel.authentication_token)
    localStorage.setItem('user_type', data.user_type)
  }

  const handleDeliveryLogin = (data) => {
    setState({ ...state, login_status: true, email: data.delivery.email, name: data.delivery.name, messages: data.messages })
    localStorage.setItem('delivery_auth_token', data.delivery.authentication_token)
    localStorage.setItem('user_type', data.user_type)
  }

  const handleAdminLogin = (data) => {
    setState({ ...state, login_status: true, email: data.admin.email, name: data.admin.name, messages: data.messages })
    localStorage.setItem('admin_auth_token', data.admin.authentication_token)
    localStorage.setItem('user_type', data.user_type)
  }

  const handleAdminLogout = () => {
    localStorage.setItem('admin_auth_token', null)
    localStorage.setItem('user_type', null)
    setState({ ...state, login_status: false })
  }

  const handleCustomerLogout = () => {
    localStorage.setItem('customer_auth_token', null)
    localStorage.setItem('user_type', null)
    setState({ ...state, login_status: false })
  }

  const handleHotelLogout = () => {
    localStorage.setItem('hotel_auth_token', null)
    localStorage.setItem('user_type', null)
    setState({ ...state, login_status: false })
  }

  const handleDeliveryLogout = () => {
    localStorage.setItem('delivery_auth_token', null)
    localStorage.setItem('user_type', null)
    setState({ ...state, login_status: false })
  }

  useEffect(() => {
    const auto_login_admin = () => {
      axios.get('http://localhost:3030/v1/admins/is_logged_in', { headers: { 'AUTH-TOKEN': localStorage.getItem("admin_auth_token") } })
        .then(response => {
          if (response.data.is_success) {
            handleAdminLogin(response.data)
          } else {
            setState({ ...state, messages: response.data.messages })
          }
        })
        .catch(error => console.log('api errors:', error)
        )
    }
    const auto_login_customer = () => {
      axios.get('http://localhost:3030/v1/customers/is_logged_in', { headers: { 'AUTH-TOKEN': localStorage.getItem("customer_auth_token") } })
        .then(response => {
          if (response.data.is_success) {
            handleCustomerLogin(response.data)
          } else {
            setState({ ...state, messages: response.data.messages })
          }
        })
        .catch(error => console.log('api errors:', error)
        )
    }

    const auto_login_hotel = () => {
      axios.get('http://localhost:3030/v1/hotels/is_logged_in', { headers: { 'AUTH-TOKEN': localStorage.getItem("hotel_auth_token") } })
        .then(response => {
          if (response.data.is_success) {
            handleHotelLogin(response.data)
          } else {
            setState({ ...state, messages: response.data.messages })
          }
        })
        .catch(error => console.log('api errors:', error)
        )
    }

    const auto_login_delivery = () => {
      axios.get('http://localhost:3030/v1/deliveries/is_logged_in', { headers: { 'AUTH-TOKEN': localStorage.getItem("delivery_auth_token") } })
        .then(response => {
          if (response.data.is_success) {
            handleDeliveryLogin(response.data)
          } else {
            setState({ ...state, messages: response.data.messages })
          }
        })
        .catch(error => console.log('api errors:', error)
        )
    }

    const user_type = localStorage.getItem("user_type")
    // console.log(user_type);
    // console.log(localStorage.getItem("auth_token"))
    if (user_type) {
      if (user_type === "customer") {
        auto_login_customer();
      } else if (user_type === "hotel") {
        auto_login_hotel();
      } else if (user_type === "delivery") {
        auto_login_delivery();
      } else if (user_type === "admin") {
        auto_login_admin();
      } else return;
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div>

      <Header login_status={state.login_status} handleAdminLogout={handleAdminLogout} handleCustomerLogout={handleCustomerLogout} handleHotelLogout={handleHotelLogout} handleDeliveryLogout={handleDeliveryLogout} />

      <Switch>
        <Route exact path='/' component={() => <Home login_status={state.login_status} />} />

        <Route exact path='/admins/sign_in' component={() => <AdminLogin handleLogin={handleAdminLogin} />} />
        <Route exact path='/admins/dashboard' component={() => <AdminDashboard admin={state} />} />
        <Route exact path='/admins/profile' component={() => <AdminProfile handleLogout={handleAdminLogout} />} />
        <Route exact path='/admins/verify_hotel' component={() => <VerifyHotels />} />
        <Route exact path='/admins/verify_delivery_people' component={() => <VerifyDeliveryPeople />} />


        <Route exact path='/customers/sign_in' component={() => <CustomerLogin handleLogin={handleCustomerLogin} />} />
        <Route exact path='/customers/sign_up' component={() => <CustomerRegistration handleLogin={handleCustomerLogin} />} />
        <Route exact path='/customers/dashboard' component={() => <CustomerDashboard customer={state} />} />
        <Route exact path='/customers/profile' component={() => <CustomerProfile handleLogout={handleCustomerLogout} />} />
        <Route exact path='/customers/cart' component={() => <Cart />} />
        <Route exact path='/customers/confirm_order' component={() => <OrderConfirmation />} />
        <Route exact path='/customers/orders_history' component={() => <OrderHistory />} />
        <Route exact path='/customers/orders_status' component={() => <CustomerOrderStatus />} />


        <Route exact path='/hotels/sign_in' component={() => <HotelLogin handleLogin={handleHotelLogin} />} />
        <Route exact path='/hotels/sign_up' component={() => <HotelRegistration handleLogin={handleHotelLogin} />} />
        <Route exact path='/hotels/dashboard' component={() => <HotelDashboard hotel={state} />} />
        <Route exact path='/hotels/profile' component={() => <HotelProfile handleLogout={handleHotelLogout} />} />
        <Route exact path='/hotels/order_status' component={() => <OrderStatus />} />
        <Route exact path='/hotels/confirm' component={() => <OrderConfirm />} />
        <Route exact path='/hotels/assign' component={() => <OrderAssign />} />


        <Route exact path='/deliveries/sign_in' component={() => <DeliveryLogin handleLogin={handleDeliveryLogin} />} />
        <Route exact path='/deliveries/sign_up' component={() => <DeliveryRegistration handleLogin={handleDeliveryLogin} />} />
        <Route exact path='/deliveries/dashboard' component={() => <DeliveryDashboard delivery={state} />} />
        <Route exact path='/deliveries/profile' component={() => <DeliveryProfile handleLogout={handleDeliveryLogout} />} />
        <Route exact path='/deliveries/order_status' component={() => <DeliveryOrderStatus />} />
        <Route exact path='/deliveries/deliver' component={() => <Deliver />} />

      </Switch>
      <Footer />
    </div>
  )
}

export default Main
