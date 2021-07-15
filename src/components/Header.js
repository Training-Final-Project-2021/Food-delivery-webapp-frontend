import React, { useState } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';
import { NavLink, useHistory} from 'react-router-dom';
import axios from 'axios';

function Header(props) { 
        const history = useHistory();
        const [isNavOpen, setState]  = useState(false)
        const toggleNav = () => {
            setState(!isNavOpen)
          }

        const handleCustomerClick = () => {
            axios.delete('http://localhost:3030/v1/customers/sign_out', {headers: {"AUTH-TOKEN" :localStorage.getItem("customer_auth_token")}})
            .then(() => {
              props.handleCustomerLogout()
              history.push('/')
            })
            .catch(error => console.log(error))
        }

        const handleAdminClick = () => {
            axios.delete('http://localhost:3030/v1/admins/sign_out', {headers: {"AUTH-TOKEN" :localStorage.getItem("admin_auth_token")}})
            .then(() => {
              props.handleAdminLogout()
              history.push('/')
            })
            .catch(error => console.log(error))
        }

        const handleHotelClick = () => {
            axios.delete('http://localhost:3030/v1/hotels/sign_out', {headers: {"AUTH-TOKEN" :localStorage.getItem("hotel_auth_token")}})
            .then(() => {
              props.handleHotelLogout()
              history.push('/')
            })
            .catch(error => console.log(error))
        }

        const handleDeliveryClick = () => {
            axios.delete('http://localhost:3030/v1/deliveries/sign_out', {headers: {"AUTH-TOKEN" :localStorage.getItem("delivery_auth_token")}})
            .then(() => {
              props.handleDeliveryLogout()
              history.push('/')
            })
            .catch(error => console.log(error))
        }

        const dashBoardFunctionality = () => {
            if(props.login_status) {
                let user_type = localStorage.getItem("user_type")
                if (user_type === "customer") {
                    return (
                        <NavItem>
                            <NavLink className="nav-link"  to='/customers/dashboard'><span className="fa fa-shopping-basket fa-lg"></span> My Dashboard </NavLink>
                        </NavItem>
                    )
                } else if(user_type === "admin") {
                    return (
                        <NavItem>
                            <NavLink className="nav-link"  to='/admins/dashboard'><span className="fa fa-shopping-basket fa-lg"></span> My Dashboard </NavLink>
                        </NavItem>
                    )
                } else if(user_type === "hotel") {
                    return (
                        <NavItem>
                            <NavLink className="nav-link"  to='/hotels/dashboard'><span className="fa fa-shopping-basket fa-lg"></span> My Dashboard </NavLink>
                        </NavItem>
                    )
                } else if(user_type === "delivery") {
                    return (
                        <NavItem>
                            <NavLink className="nav-link"  to='/deliveries/dashboard'><span className="fa fa-shopping-basket fa-lg"></span> My Dashboard </NavLink>
                        </NavItem>
                    )
                }
            } else {
                 return (
                    <NavItem>
                        <NavLink className="nav-link"  to='/'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                    </NavItem>
                 );
            }
        }

        const signOutFunctionality = () => {
            if(props.login_status) {
                let user_type = localStorage.getItem("user_type")
                if (user_type === "customer") {
                    return (
                        <NavItem>
                            <NavLink className="nav-link"  to='/' onClick={handleCustomerClick} ><span className="fa fa-sign-out fa-lg"></span> Sign Out</NavLink>
                        </NavItem>
                    )
                } else if(user_type === "hotel") {
                    return (
                        <NavItem>
                            <NavLink className="nav-link"  to='/' onClick={handleHotelClick} ><span className="fa fa-sign-out fa-lg"></span> Sign Out</NavLink>
                        </NavItem>
                    )
                } else if(user_type === "admin") {
                    return (
                        <NavItem>
                            <NavLink className="nav-link"  to='/' onClick={handleAdminClick} ><span className="fa fa-sign-out fa-lg"></span> Sign Out</NavLink>
                        </NavItem>
                    )
                } else if(user_type === "delivery") {
                    return (
                        <NavItem>
                            <NavLink className="nav-link"  to='/' onClick={handleDeliveryClick} ><span className="fa fa-sign-out fa-lg"></span> Sign Out</NavLink>
                        </NavItem>
                    )
                }
            } else {
                 return null;
            }
        }

        const profileFunctionality = () => {
            if(props.login_status) {
                let user_type = localStorage.getItem("user_type")
                console.log("user-type = ", user_type);
                if (user_type === "customer") {
                    return (
                        <NavItem>
                            <NavLink className="nav-link" to="/customers/profile"><i className="fa fa-lg fa-user-circle" aria-hidden="true"></i></NavLink>
                        </NavItem>
                    )
                } else if(user_type === "hotel") {
                    return (
                        <NavItem>
                            <NavLink className="nav-link" to="/hotels/profile"><i className="fa fa-lg fa-user-circle" aria-hidden="true"></i></NavLink>
                        </NavItem>
                    )
                } else if(user_type === "admin") {
                    return (
                        <NavItem>
                            <NavLink className="nav-link" to="/admins/profile"><i className="fa fa-lg fa-user-circle" aria-hidden="true"></i></NavLink>
                        </NavItem>
                    )
                } else if(user_type === "delivery") {
                    return (
                        <NavItem>
                            <NavLink className="nav-link" to="/deliveries/profile"><i className="fa fa-lg fa-user-circle" aria-hidden="true"></i></NavLink>
                        </NavItem>
                    )
                }
            } else {
                 return null;
            }
        }

        return(
            <div>
                <Navbar className="bg-dark navbar-dark" expand="md" fixed="top">
                    <div className="container">
                        <NavbarToggler onClick={toggleNav} />
                        <NavbarBrand className="mr-auto" href="/"> Food For All</NavbarBrand>
                        <Collapse isOpen={isNavOpen} navbar>
                            <Nav navbar className="ms-auto">
                                { dashBoardFunctionality() }
                                
                                { signOutFunctionality() }
                                
                                { profileFunctionality() }

                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container border-bottom">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Food Delivery Web App</h1>
                                <p>This web application is given as an assigment, which is a part of react training. In this application rails api is serving as backend and front end is created using reactJs</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <hr />
            </div>
        )
}

export default Header;