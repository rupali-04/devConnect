import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";


const Register = () =>{
    const [formData,setFormData] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    });

    const {name,email,password,cpassword} = formData;

    const onChange = e => setFormData({...formData,[e.target.name]: e.target.value}) ;

    const onSubmit = async(e) =>{
        e.preventDefault();
        if(password != cpassword){
            console.log("Password dose not match!!");
        }else{
            console.log("Sucess!!");
        }
    }
    return (
        <Fragment>
            <h1>SignUp</h1>
            <p>Create your account</p>
            <form onSubmit={e => onSubmit(e)}>

                <div>
                    <input type="text" placeholder="Name" name="name" value={name} onChange ={e => onChange(e)} required>
                    </input>
                </div>
                <div>
                    <input type="email" placeholder="Email Address" name="email" value={email} required onChange ={e => onChange(e)}></input>

                    <small>This site uses Gravatar so if you want a profie image, use a Gravatar email</small>
                </div>
                <div>
                    <input type="password" placeholder="Password" name="password" minLength="6" value={password} required onChange ={e => onChange(e)}></input>
                </div>
                <div>
                <input type="password" placeholder="Confirm Password" name="cpassword" minLength="6" value={cpassword} required onChange ={e => onChange(e)}></input>
                </div>
                <input type="submit" value="Register" ></input>
            </form>
            <p>Already have an account?<Link to="/login">Sign In</Link></p>
        </Fragment>
    )
}


export default Register;