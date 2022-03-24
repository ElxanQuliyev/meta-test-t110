import React from 'react'
import './pricing-plan.scss';
import * as Icon from "react-bootstrap-icons";
import { Link } from 'react-router-dom';

const PricingPlan = () => {
  return (
    <section className='pricingPlan'>
        <div className="container">
            <div className="pricing-head">
               <h1>MetaFlix Paketləri</h1>
            </div>
            <div className="pricing-content">
                <div className="container">
                    <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                            <div className="pricing-card">
                                <div className="card-head">
                                   <div className="d-flex justify-content-between align-items-center">
                                   <h2>Sadə Paket</h2>
                                    <p>Ödənişsiz</p>
                                   </div>
                                </div>
                                <div className="card-content">
                                    <ul>
                                        <li> <Icon.CheckCircleFill className='check-ico'/> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis.</li>
                                        <li><Icon.CheckCircleFill className='check-ico'/> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis.</li>
                                        <li><Icon.CheckCircleFill className='check-ico'/> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis.</li>
                                        <li><Icon.XCircleFill className='check-ico x-ico'/> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis.</li>
                                        <li><Icon.XCircleFill className='check-ico x-ico'/> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis.</li>
                                        <li><Icon.XCircleFill className='check-ico x-ico'/> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis.</li>
                                    </ul>
                                </div>
                                <div className="card-btn">
                                    <Link className='card-packet-btn' to="#">Paketi seç</Link>
                                    <Link style={{display:"none"}} className='card-packet-btn active-btn' to="#">Seçili paket</Link>

                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                            <div className="pricing-card active">
                                <div className="card-head">
                                   <div className="d-flex justify-content-between align-items-center">
                                   <h2>Sinematik Paket</h2>
                                    <p className='price-p active-p'>10Azn <span>/ay</span></p>
                                   </div>
                                </div>
                                <div className="card-content">
                                    <ul>
                                        <li> <Icon.CheckCircleFill className='check-ico'/> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis.</li>
                                        <li><Icon.CheckCircleFill className='check-ico'/> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis.</li>
                                        <li><Icon.CheckCircleFill className='check-ico'/> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis.</li>
                                        <li><Icon.CheckCircleFill className='check-ico'/> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis.</li>
                                        <li><Icon.XCircleFill className='check-ico x-ico'/> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis.</li>
                                        <li><Icon.XCircleFill className='check-ico x-ico'/> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis.</li>
                                    </ul>
                                </div>
                                <div className="card-btn">
                                    <Link style={{display:"none"}} className='card-packet-btn' to="#">Paketi seç</Link>
                                    <Link className='card-packet-btn active-btn' to="#">Seçili paket</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                            <div className="pricing-card">
                                <div className="card-head">
                                   <div className="d-flex justify-content-between align-items-center">
                                   <h2>Premium Paket</h2>
                                   <p className='price-p'>20Azn <span>/ay</span></p>
                                   </div>
                                </div>
                                <div className="card-content">
                                    <ul>
                                        <li> <Icon.CheckCircleFill className='check-ico'/> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis.</li>
                                        <li><Icon.CheckCircleFill className='check-ico'/> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis.</li>
                                        <li><Icon.CheckCircleFill className='check-ico'/> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis.</li>
                                        <li><Icon.CheckCircleFill className='check-ico'/> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis.</li>
                                        <li><Icon.CheckCircleFill className='check-ico'/> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis.</li>
                                        <li><Icon.CheckCircleFill className='check-ico'/> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis.</li>
                                    </ul>
                                </div>
                                <div className="card-btn">
                                    <Link className='card-packet-btn' to="#">Paketi seç</Link>
                                    <Link style={{display:"none"}} className='card-packet-btn active-btn' to="#">Seçili paket</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default PricingPlan