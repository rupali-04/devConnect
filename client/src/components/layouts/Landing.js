import React from "react";
import { Link } from "react-router-dom";

const Landing = () =>{
    return (
        <section>
            <div>
                <div>
                    <h1>
                        Developer Connector
                    </h1>
                    <p>
                        Create a developer profile, share posts and get help from other Devs.
                    </p>
                    <div>
                        <li><Link to='/register'>SignUp</Link></li>
                        <li><Link to='/register'>Login</Link></li>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default Landing;