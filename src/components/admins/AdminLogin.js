import React, {useState} from 'react'
import { useHistory} from "react-router-dom";
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
            <div className="card col-12 col-md-4 mt-2 mb-4 offset-4">
                <h1 className="card-header bg-dark text-white">Admin Login</h1>
                <div className="card-body">
                    <form className="form">
                        <div className="form-group text-left">
                            <label>Email address</label>
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
                        <div className="form-group text-left mt-2">
                            <label>Password</label>
                            <input type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                value={state.password}
                                onChange={handleChange}
                            />
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit} > Login </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin;