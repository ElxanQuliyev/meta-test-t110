import React from 'react';
import './sign-up.scss';
const SignIn = (props) => {
  return (
    <section className={`${props.className} signUp-section`}>
         <div className="container d-flex justify-content-center">
           <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5">
           <div className="sign-up-content">
             <h2>Daxil ol</h2>
         
          <label className='reg-lab' required htmlFor="email">Email *</label>
          <input className='reg-inp' required type="text" id='email' name='email' placeholder='mail' />
          
          <label className='reg-lab' required htmlFor="pass">Şifrə *</label>
          <input className='reg-inp' required type="password" id='pass' name='pass' placeholder='şifrə' />
        
          <input className='reg-inp-submit sign-in-bt' type="submit" value="Daxil ol" />
        </div>
           </div>
        </div>
    </section>
  )
}

export default SignIn