import React, { useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import Home from './Home'
import { Switch, Route } from 'react-router-dom'
import CustomerLogin from './customers/CustomerLogin'
import CustomerRegistration from './customers/CustomerRegistrations'
import CustomerDashboard from './customers/CustomerDashboard'

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
    }

    const handleLogout = () => {
        setState({auth_token: null})
    }

    return (
        <div>
            <Header login_status={state.login_status} handleLogout={handleLogout} auth_token={state.auth_token}/>
            <Switch>
                <Route exact path='/' component={() => <Home />} />
                <Route exact path='/customers/sign_in' component={() => <CustomerLogin handleLogin={handleLogin} />} />
                <Route exact path='/customers/sign_up' component={() => <CustomerRegistration handleLogin={handleLogin} />} />
                <Route exact path='/customers/dashboard' component={() => <CustomerDashboard customer={state} />} />
            </Switch>
            <Footer />
        </div>
    )
}

export default Main
