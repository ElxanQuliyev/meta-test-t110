import React from 'react';
import './sign-up.scss';
import { Link} from "react-router-dom";

const SignUp = (props) => {
  return (
    <section className={`${props.className} signUp-section`}>
        <div className="container d-flex justify-content-center">
           <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5">
           <div className="sign-up-content">
             <h2>Qeydiyyat</h2>
          <label className='reg-lab' htmlFor="fullName">Ad və soyad *</label>
          <input className='reg-inp' required type="text" id='fullName' name='fullName' placeholder='ad və soyad' />
          <label className='reg-lab' required htmlFor="email">Email *</label>
          <input className='reg-inp' required type="text" id='email' name='email' placeholder='mail' />
          <label className='reg-lab' required htmlFor="phone">Telefon *</label>
          <input className='reg-inp' required type="phone" id='phone' name='phone' placeholder='telefon nömrəsi' />
          <label className='reg-lab' required htmlFor="pass">Şifrə *</label>
          <input className='reg-inp' required type="password" id='pass' name='pass' placeholder='şifrə' />
          <label className='reg-lab' required htmlFor="rePass">Şifrə təkrarı *</label>
          <input className='reg-inp' required type="password" id='rePass' name='rePass' placeholder='şifrə təkrarı' />
          <p> <div className='form-switch '><input className="form-check-input btn btn-btn-danger" id="flexSwitchCheckDefault" type="checkbox" /></div> <Link className='privacy-link' to="/">Şərtləri</Link> Oxudum və razıyam</p>
          <input className='reg-inp-submit' type="submit" value="Qeydiyyatdan keç" />
        </div>
           </div>
        </div>

    </section>
  )
}

export default SignUp