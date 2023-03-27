import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { loginaction }from "./slices/loginSlice";
import axios from "axios";
import { useState } from "react";
// import { ErrorMessage } from '@hookform/error-message';

function Login(){
    const { register, formState: { errors }, handleSubmit } = useForm(); 
    const [loginError, setLoginError] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (data) =>{
            // console.log(data);
            try {
                axios.get("http://localhost:4200/user/"+data.email).then(function (res) {
                    if(res.data !== ""){
                        if(res.data.password === data.password){
                            navigate('/dashboard');
                            localStorage.setItem('token_login', data.email);
                            if(res.data.usergroup === 0){
                               localStorage.setItem('token_super_auth', 1);
                            }else{
                                localStorage.removeItem('token_super_auth');
                            }
                            dispatch(loginaction.login())
                        }else{
                           setLoginError('Password does not match the login email')
                        }
                    }else{
                        setLoginError('Email is not registerd')
                    }
                 //call redux and store
                //  dispatch(loginaction.login())
                  // navigate('/dashboard')
               });
             } catch (e) {
               console.log(e);
             }
           
    }

    const handleregister = () =>{
        navigate('/register')
    }

    return (
        <div>
          <h2>login</h2>
            <form onSubmit={handleSubmit(handleLogin)}>
                 <p id="error_text">{loginError}</p>
                <label >Email</label>
                <input type="email" id="email" name="email" placeholder="email"  {...register('email' , {required: "Email is empty",pattern:{value: /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/gm, message:"not valid email"}})}/>
                <p id="error_text" >{errors.email?.message}</p>
                <label >Password</label>
                <input type="password" id="password" name="password" placeholder="Password" {...register('password',{required:"password is required"})}/>
                <p id="error_text">{errors.password?.message}</p>
                <input type="submit" value="login" />
                <button onClick={handleregister}>Register</button>
            </form>
        </div>
    )
}

export default Login;