import React from 'react';
import { Link } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';


const PricingPlan = () => {
  return <section className='pricingPlan'>
      <div className="container">
          <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <div className="pricing-card">
                      <div className="card-head">
                          <h1>Ödənişsiz paket</h1>
                          <h3 style={{color:"#ED333C"}}><Icon.CashCoin/> Pulsuz</h3>
                      </div>
                      <div className="card-content">
                          <ul>
                              <li><Icon.PatchCheck className='check'/> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit corporis inventore nostrum. </li>
                              <li><Icon.PatchCheck className='check'/> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit corporis inventore nostrum. </li>
                              <li><Icon.PatchCheck className='check'/> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit corporis inventore nostrum. </li>
                              <li><Icon.PatchCheck className='check'/> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit corporis inventore nostrum. </li>
                              <li><Icon.PatchCheck className='check'/> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit corporis inventore nostrum. </li>
                              <li><Icon.PatchCheck className='check'/> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit corporis inventore nostrum. </li>
                          </ul>
                      </div>
                      <div className="price-btn">
                      <Link className='priceBtn' to="/SignUp">Abunə ol</Link>
                      </div>
                  </div>
              </div>
              <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <div className="pricing-card">
                      <div className="card-head">
                          <h1>Ödənişli paket</h1>
                          <h3 style={{color:"#ED333C"}}><Icon.CashCoin/> 5Azn</h3>
                      </div>
                      <div className="card-content">
                          <ul>
                              <li><Icon.PatchCheck className='check'/> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit corporis inventore nostrum. </li>
                              <li><Icon.PatchCheck className='check'/> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit corporis inventore nostrum. </li>
                              <li><Icon.PatchCheck className='check'/> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit corporis inventore nostrum. </li>
                              <li><Icon.PatchCheck className='check'/> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit corporis inventore nostrum. </li>
                              <li><Icon.PatchCheck className='check'/> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit corporis inventore nostrum. </li>
                              <li><Icon.PatchCheck className='check'/> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit corporis inventore nostrum. </li>
                          </ul>
                      </div>
                      <div className="price-btn">
                      <Link className='priceBtn' to="/SignUp">Abunə ol</Link>
                      </div>
                  </div>
              </div>
              <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <div className="pricing-card">
                      <div className="card-head">
                          <h1>Premium paket</h1>
                          <h3 style={{color:"#ED333C"}}><Icon.CashCoin/> 10azn</h3>
                      </div>
                      <div className="card-content">
                          <ul>
                              <li><Icon.PatchCheck className='check'/> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit corporis inventore nostrum. </li>
                              <li><Icon.PatchCheck className='check'/> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit corporis inventore nostrum. </li>
                              <li><Icon.PatchCheck className='check'/> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit corporis inventore nostrum. </li>
                              <li><Icon.PatchCheck className='check'/> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit corporis inventore nostrum. </li>
                              <li><Icon.PatchCheck className='check'/> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit corporis inventore nostrum. </li>
                              <li><Icon.PatchCheck className='check'/> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit corporis inventore nostrum. </li>
                          </ul>
                      </div>
                      <div className="price-btn">
                      <Link className='priceBtn' to="/SignUp">Abunə ol</Link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </section>;
};

export default PricingPlan;
