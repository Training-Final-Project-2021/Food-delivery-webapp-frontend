import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
//import {Link} from 'react-router-dom';

function Home() {
    return (
        <div>
            <div className="home-top">
                <h1 className="text-decoration-underline text-dark fw-bold bg-white text-center">Hungry? You're in the right place</h1>        
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="h-80 p-4 m-5 text-white bg-dark rounded-3"> 
                            <p>Want to order food?<br/>Sign in here!</p>
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
                            <p>Want to add your hotel?<br/>Sign in here!</p>
                            <button type="button" className="btn btn-primary">Sign In</button>
                            <br/><br/>
                            <p>Not a member yet? <br/>Register here!</p>
                            <button type="button" className="btn btn-primary">Sign Up</button>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="h-80 p-4 m-5 rounded-3 text-white bg-dark">
                            <p>Want to deliver food?<br/>Sign in here!</p>
                            <button type="button" className="btn btn-primary">Sign In</button>
                            <br/><br/>
                            <p>Not a member yet? <br/>Register here!</p>
                            <button type="button" className="btn btn-primary">Sign Up</button>
                        </div>
                    </div>
                    <div className="col-4 offset-4">
                    <div className="h-80 p-4 m-5 border border-3 rounded-3 text-white bg-secondary">
                        <p>Sign in as admin</p>
                        <button type="button" className="btn btn-primary">Sign In</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        
    )
}

export default Home
