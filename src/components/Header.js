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

        const handleClick = () => {
            axios.delete('http://localhost:3030/v1/customers/sign_out', {headers: {"AUTH-TOKEN" :props.auth_token}})
            .then(response => {
              props.handleLogout()
              history.push('/')
            })
            .catch(error => console.log(error))
        }

        return(
            <div>
                <Navbar className="bg-dark navbar-dark" expand="md" fixed="top">
                    <div className="container">
                        <NavbarToggler onClick={toggleNav} />
                        <NavbarBrand className="mr-auto" href="/"> Food For All</NavbarBrand>
                        <Collapse isOpen={isNavOpen} navbar>
                            <Nav navbar className="ms-auto">
                                <NavItem>
                                    <NavLink className="nav-link"  to='/'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/login'><span className="fa fa-sign-in fa-lg"></span> Sign In</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/signup'><span className="fa fa-user-plus fa-lg"></span> New User</NavLink>
                                </NavItem>
                                {
                                    props.login_status ?
                                        <NavItem>
                                            <NavLink className="nav-link"  to='/' onClick={handleClick} ><span className="fa fa-sign-out fa-lg"></span> Sign Out</NavLink>
                                        </NavItem> : null
                                }
                                <NavItem>
                                    <NavLink className="nav-link" to='/hotels_list'><span className="fa fa-cutlery fa-lg"></span> Show Dishes</NavLink>
                                </NavItem>
                                {
                                    props.login_status ?
                                        <NavItem>
                                            <NavLink className="nav-link" to="/profile"><i className="fa fa-lg fa-user-circle" aria-hidden="true"></i></NavLink>
                                        </NavItem> : null
                                }

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