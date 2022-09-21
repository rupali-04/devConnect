import React,{Fragment,useState} from "react";
import { Link } from "react-router-dom";


const Login = () =>{
    const [formData,setFormData] = useState({
        email: "",
        password: ""
    });
    const {email,password} = formData;

    const onChange = e => setFormData({...formData,[e.target.name]: e.target.value}) ;

    const onSubmit = async(e) =>{
        e.preventDefault();
        console.log(email,password);
    }
    return (
        <Fragment>
            <h1>SignIn</h1>
            <p>Sing-in in your account</p>
            <form onSubmit={e => onSubmit(e)}>

                <div>
                    <input type="email" placeholder="Email Address" name="email" value={email} required onChange ={e => onChange(e)}></input>

                   
                </div>
                <div>
                    <input type="password" placeholder="Password" name="password" minLength="6" required value={password} onChange ={e => onChange(e)}></input>
                </div>
                <input type="submit" value="Login" ></input>
            </form>
            <p>Do not have an account?<Link to="/register">Sign Up</Link></p>
        </Fragment>
    )
}


export default Login;