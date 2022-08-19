import React, {useState} from "react";
import "./RegisterCard.css";
import axios from "axios";

export const RegisterCard = () => {

  const [usernameReg, setUsernameReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('')

  const register = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:4003/register`, {
      username: usernameReg, 
      password: passwordReg
     }).then((response)=> {
      console.log(response)
     })
  }

  return (
    <div>
    <h1> Register</h1>
    <div className="register_container">
      <form className="register_form">
        <input type="text" placeholder="username" onChange={(e)=>{setUsernameReg(e.target.value)}} />

        <input type="password" placeholder="password"  onChange={(e)=>{setPasswordReg(e.target.value)}}/>

        <br />

        <button type="submit" onClick={register}>Register</button>
      </form>
    </div>
    </div>
  );
};
