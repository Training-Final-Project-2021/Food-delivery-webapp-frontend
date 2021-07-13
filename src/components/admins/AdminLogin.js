import React, {useState} from 'react'
import {Link, useHistory} from "react-router-dom";
import axios from 'axios';
function AdminLogin(props) {
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
        let admin = {
          email: email,
          password: password
        }
    
        axios.post('http://localhost:3030/v1/admins/sign_in', { admin })
          .then(response => {
            if (response.data.is_success) {
                setState({...state, auth_token: response.data.admin.authentication_token, messages: response.data.messages })
                //console.log(response.data.admin.authentication_token,", auth-token = ", state.auth_token)
              props.handleLogin(response.data)
              history.push('/admins/dashboard');
            } else {
              setState({...state, messages: response.data.messages })
            }
          })
          .catch(error => console.log('api errors:', error))
      };
    

    return (
        <div>
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
                <form>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputEmail1">Email address</label>
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
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            value={state.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                    > Login
                    </button>
                    <Link to="/admins/sign_up" > <button  className="btn btn-primary">signup</button></Link>

                </form>
            </div>
        </div>
    )
}

export default AdminLogin;