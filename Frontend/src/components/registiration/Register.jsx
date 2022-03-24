import React, { useState } from "react";
import './register.scss';
import SignUp from "./SignUp";
import bgReg from '../../assets/image/head-bg.jpg'
import SignIn from "./SignIn";

const Register = () => {
  const [isActive, setActive ] = useState(1);

  const openContent = (index) =>{
    setActive(index);
  }
  return (
    <section style={{background:`url(${bgReg})`}} className="registration">
      <div className="head-reg-content">
        <button onClick={()=> setActive(1)} className={isActive===1?"active-reg-btn": ""}>Daxil ol</button>
        <button onClick={()=> setActive(2)} className={isActive===2?"active-reg-btn": ""}>Qeydiyyat</button>
      </div>
      <div  className={isActive===1?"sign-active ": "d-none"}>
      <SignIn className={isActive===1?"": "d-none"}/>   
      </div>
      <div  className={isActive===2?"sign-active ": "d-none"}>
      <SignUp className={isActive===2?"": "d-none"}/>                                            
      </div>
      <div className="overlay-bg"></div>

    </section>
  );
};

export default Register;
