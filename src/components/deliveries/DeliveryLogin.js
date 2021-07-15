import React, {useState} from 'react'
import {Link, useHistory} from "react-router-dom";
import axios from 'axios';
function DeliveryLogin(props) {
    const history = useHistory();
    const [state, setState] = useState({
        email: "",
        password: "",
        auth_token: "",
        messages: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const { email, password } = state
        let delivery = {
          email: email,
          password: password
        }
    
        axios.post('http://localhost:3030/v1/deliveries/sign_in', { delivery })
          .then(response => {
            if (response.data.is_success) {
                setState({...state, auth_token: response.data.delivery.authentication_token, messages: response.data.messages })
                //console.log(response.data.delivery.authentication_token,", auth-token = ", state.auth_token)
              props.handleLogin(response.data)
              history.push('/deliveries/dashboard');
            } else {
              setState({...state, messages: response.data.messages })
            }
          })
          .catch(error => console.log('api errors:', error))
      };
    

    return (
        <div>
            <div className="card col-12 col-lg-4 mt-2 offset-4">
                <h1 className="card-header bg-dark text-white">Delivery Login</h1>
                <div className="card-body">
                <form>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email"
                            className="form-control mt-2"
                            name="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={state.email}
                            onChange={handleChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password"
                            className="form-control mt-2"
                            name="password"
                            placeholder="Password"
                            value={state.password}
                            onChange={handleChange}
                        />
                    </div>
                    <br/>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                    > Login
                    </button>
                    <Link to="/deliveries/sign_up" > <button  className="btn btn-primary">signup</button></Link>

                </form>
            </div>
            </div>
        </div>
    )
}

export default DeliveryLogin;