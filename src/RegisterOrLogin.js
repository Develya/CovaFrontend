import React from "react";
import { useNavigate } from "react-router-dom";
const RegisterOrLogin = () =>{

    const navigate = useNavigate();

    const handleRegister = () =>{
        navigate('/register')
    }

    const handleLogin = () =>{
        navigate('/login')
    }

    return(
        <div className="container">
            <button onClick={() => handleRegister()}>Register</button>
            <p>or</p>
            <button onClick={() => handleLogin()}>Login</button>
        </div>
    )
}

export default RegisterOrLogin