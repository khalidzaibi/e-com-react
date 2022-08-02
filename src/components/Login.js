import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    });

    const collectData =async ()=>{
        let result =await fetch('http://localhost:5000/login',{
            method:'POST',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result =await result.json();
        if(result.token){
             localStorage.setItem('user',JSON.stringify(result.user));
             localStorage.setItem('token',JSON.stringify(result.token));
             navigate('/');
        }else{
             alert('Wrong credentials');
        }

    }

    return (
        <div className="signUp">
            <input className="inputBox" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" />
            <input className="inputBox" value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password"  />
            <button onClick={collectData} className="appButton">Login</button>
        </div>
    )
}

export default Login;