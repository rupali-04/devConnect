import React from "react";
import { Link } from "react-router-dom";

const Navbar = () =>{
    return (
        <nav> 
            <h1>
                <Link to="/">DevConnector</Link>
            </h1>
            <ul>
                <li>
                    <a>Developers</a>
                </li>
                
                <li>
                    <Link to="/register">Register</Link>
                </li>
                
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    )
}


export default Navbar;