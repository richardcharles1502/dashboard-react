import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
import { useSelector } from "react-redux/es/exports";

function Register(){
    const { register, formState: { errors }, handleSubmit } = useForm(); 
    const usenavigate = useNavigate();
    const [error , seterror] = useState();
     //get update data
     const updateuservalue = useSelector((state) => state.dashboard.updateuser);
    

    const handleLogin = (data) =>{
        if(updateuservalue.email === undefined){
            axios.post("http://localhost:4200/add_user",{data}).then(res =>{
                    usenavigate("/login");
            }).catch(error => {
                    if(error.response){
                        seterror(error.response.data.message)
                    }
            })
      }else{
        //  console.log(data);
        axios.put("http://localhost:4200/updateuser/"+data.email,{data}).then(res =>{
                    usenavigate("/dashboard");
            }).catch(error => {
                    if(error.response){
                        seterror(error.response.data.message)
                    }
            })
      }
    }

    return (
        <div>
            <h2>Register here</h2>
            <p id="error_text">{error}</p>
            <form onSubmit={handleSubmit(handleLogin)}>
                <label>First Name</label>
                <input type="text" id="fname" name="firstname" placeholder="firstname" defaultValue={updateuservalue.firstname} {...register('firstname' , {required: "firstname is required"}) }/>
                <p id="error_text" >{errors.firstname?.message}</p>
                <label>Last Name</label>
                <input type="text" id="lname" name="lastname" placeholder="lastname" defaultValue={updateuservalue.lastname} {...register('lastname', {required: "lastname is required"})}/>
                <p id="error_text" >{errors.lastname?.message}</p>
                <label>Email</label>
                <input type="email" id="email" name="email" placeholder="email" defaultValue={updateuservalue.email}  {...register('email', {required: "email is required",pattern:{value: /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/gm, message:"not valid email"}})}/>
                <p id="error_text" >{errors.email?.message}</p>
                <label>Password</label>
                <input type="text" id="password" name="password" placeholder="password"  defaultValue={updateuservalue.password} {...register('password', {required: "password is required"})}/>
                <p id="error_text" >{errors.password?.message}</p>
                <label >User Group</label>
                <select id="usergroup" name="usergroup" defaultValue={updateuservalue.usergroup} {...register('usergroup')}>
                <option value="0">Super User</option>
                <option value="1">Admin</option>
                <option value="2">Customer</option>
                <option value="3">Guest</option>
                </select>
                 <input type="submit" value={updateuservalue.email !== undefined ? 'Update' : 'Submit'} />
            </form>
        </div>
    )
}

export default Register;