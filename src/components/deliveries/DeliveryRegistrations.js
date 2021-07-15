import React, {useState} from 'react'
import {Link, useHistory} from "react-router-dom";
import axios from 'axios';
function DeliveryRegistration(props) {
    const history = useHistory();
    const [state, setState] = useState({
        email: "",
        password: "",
        password_confirmation: "",
        name: "",
        phone_no: "",
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
        const { email, password, password_confirmation, name, phone_no} = state
        let delivery = {
          email: email,
          password: password,
          password_confirmation: password_confirmation,
          name: name,
          status: "Unverified",
          phone_no: phone_no
        }
    
        axios.post('http://localhost:3030/v1/deliveries/sign_up', { delivery })
          .then(response => {
            if (response.data.is_success) {
                setState({...state, auth_token: response.data.delivery.authentication_token, messages: response.data.messages })
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
            <div className="card col-12 col-lg-4 offset-4 login-card mt-2 hv-center">
                <form>

                    <div className="form-group text-left">
                        <label>Your Name</label>
                        <input type="text"
                            className="form-control"
                            name="name"
                            placeholder="Name"
                            value={state.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group text-left">
                        <label>Email address</label>
                        <input type="email"
                            className="form-control"
                            name="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={state.email}
                            onChange={handleChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>

                    <div className="form-group text-left">
                        <label>Password</label>
                        <input type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            value={state.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group text-left">
                        <label >Password Confirmation</label>
                        <input type="password"
                            className="form-control"
                            name="password_confirmation"
                            placeholder="Password Confirmation"
                            value={state.password_confirmation}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group text-left">
                        <label>Phone No</label>
                        <input type="text"
                            className="form-control"
                            name="phone_no"
                            placeholder="Phone No"
                            value={state.phone_no}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                    > Register
                    </button>
                    <p>Already a user?</p>
                    <Link to="/deliverys/sign_in" > <button  className="btn btn-primary">sign In</button></Link>

                </form>
            </div>
        </div>
    )
}

export default DeliveryRegistration;