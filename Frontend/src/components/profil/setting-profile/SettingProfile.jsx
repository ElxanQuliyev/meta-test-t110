import React from 'react'
import './setting-profile.scss';
const SettingProfile = () => {
  return (
    <section className='setting-profile'>
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <div className="setting-card">
                        <div className="setting-head">
                            <h1>Profil məlumatı</h1>
                        </div>
                        <div className="setting-content">
                        <div className="left">
                                <form className='profil-name-form' method="get">
                                <label htmlFor="username">istifadəçi adı *</label>
                                <br />
                                <input className='inp-txt' name='username' id='username' type="text" placeholder='istifadəçi adı' required/>
                                <br />
                                <label htmlFor="name">ad və soyad *</label>
                                <br />
                                <input className='inp-txt' name='name' id='name' placeholder='ad və soyad' type="text" required/>
                                <br />
                                <label htmlFor="phone">telefon nömrəsi *</label>
                                <br />
                                <input className='inp-txt' name='phone' id='phone' placeholder='telefon nömrəsi' type="text" required />
                                <br />
                                <label htmlFor="email">mail *</label>
                                <br />
                                <input className='inp-txt' name='email' id='email' placeholder='mail' type="email" required />
                                <br />
                                <input type="submit" className='submit-btn' value="yaddaşda saxla" />
                            </form>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <div className="setting-card">
                        <div className="setting-head">
                            <h1>Şifrə dəyiş</h1>
                        </div>
                        <div className="setting-content">
                        <div className="left">
                                <form className='profil-name-form' method="get">
                                <label htmlFor="username">köhnə şifrə *</label>
                                <br />
                                <input className='inp-txt' name='username' id='username' type="password" placeholder='köhnə şifrə' required/>
                                <br />
                                <label htmlFor="name">yeni şifrə *</label>
                                <br />
                                <input className='inp-txt' name='name' id='name' placeholder='yeni şifrə' type="password" required/>
                                <br />
                                <label htmlFor="phone">şifrə təkrarı *</label>
                                <br />
                                <input className='inp-txt' name='phone' id='phone' placeholder='şifrə təkrarı' type="password" required />
                                <br />
                                <label htmlFor="email">doğrulama şifrəsi **</label>
                                <br />
                                <input className='inp-txt' name='email' id='email' placeholder='doğrulama şifrəsi' type="number" required />
                                <br />
                                <input type="submit" className='submit-btn' value="yaddaşda saxla" />
                            </form>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <div className="setting-card">
                        <div style={{textAlign:"center"}} className="setting-head">
                            <h1>doğrulama epoçtu</h1>
                        </div>
                        <div className="setting-content">
                        <div className="left">
                                <form className='profil-name-form' method="get">
                              <input className='submit-btn' type="submit" value="doğrulama göndər" />
                            </form>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default SettingProfile