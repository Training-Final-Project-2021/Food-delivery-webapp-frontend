import React from 'react';
import { Link } from 'react-router-dom';
//import {Link} from 'react-router-dom';

function Home(props) {
    return (
        <div>
            <div className="home-top">
                <h1 className="text-decoration-underline text-dark fw-bold bg-white text-center">Hungry? You're in the right place</h1>        
            </div>
            {
                !props.login_status ?
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <div className="h-80 p-4 m-5 text-white bg-dark rounded-3"> 
                                <p>For Customers<br/>Sign in here!</p>
                                <Link to="/customers/sign_in">
                                    <button type="button" className="btn btn-primary">Sign In</button>
                                </Link>
                                <br/><br/>
                                <p>Not a member yet? <br/>Register here!</p>
                                <Link to="/customers/sign_up">
                                    <button type="button" className="btn btn-primary">Sign Up</button>
                                </Link>
                            </div>
                        
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="h-80 p-4 m-5  rounded-3 text-white bg-dark">
                                <p>For Hotels<br/>Sign in here!</p>
                                <Link to="/hotels/sign_in">
                                    <button type="button" className="btn btn-primary">Sign In</button>
                                </Link>
                                <br/><br/>
                                <p>Not a member yet? <br/>Register here!</p>
                                <Link to="/hotels/sign_up">
                                    <button type="button" className="btn btn-primary">Sign Up</button>
                                </Link>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="h-80 p-4 m-5 rounded-3 text-white bg-dark">
                                <p>For Deliveries<br/>Sign in here!</p>
                                <Link to="/deliveries/sign_in">
                                    <button type="button" className="btn btn-primary">Sign In</button>
                                </Link>
                                <br/><br/>
                                <p>Not a member yet? <br/>Register here!</p>
                                <Link to="/deliveries/sign_up">
                                    <button type="button" className="btn btn-primary">Sign Up</button>
                                </Link>
                            </div>
                        </div>
                        <div className="col-4 offset-4">
                        <div className="h-80 p-4 m-5 border border-3 rounded-3 text-white bg-secondary">
                            <p>Sign in as admin</p>
                            <Link to="/admins/sign_in">
                                    <button type="button" className="btn btn-primary">Sign In</button>
                            </Link>
                        </div>
                    </div>
                    </div>
                </div> : null
            }
        </div>
        
    )
}

export default Home
