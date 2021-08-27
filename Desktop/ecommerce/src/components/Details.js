import React, { Component } from 'react'
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import { Buttoncontainer } from './Button';
export class Details extends Component {
      render() {
            return (
                  <ProductConsumer>
                        {(value) =>{
                              const {id, company, img, info, price, title, inCart} = value.detailProduct;
                              return (
                                    <div className="container py-5">
                                          <div className="row">
                                                <div className="col-10 mx-auto text-center text-slanted text-blue">
                                                      <h1>{title}</h1>
                                                </div>
                                          </div>
                                          <div className="row">
                                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                                      <img src={img} className="img-fluid imgis" alt="product"/>
                                                </div>
                                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                                      <h1>model : {title}</h1>
                                                      <h4 className="text-title text-uppercase text-muted mt3 mb2">
                                                            made by : <span className="text-uppercase">{company}</span>
                                                      </h4>
                                                      <h4 className="text-blue">
                                                            <strong>
                                                                  price: <span>$</span>
                                                                  {price}
                                                            </strong>
                                                      </h4>
                                                      <p className="text-capitlize font-weight-bold mt-3 mb-0">
                                                            som info about the product:
                                                      </p>
                                                      <p className="text-muted lead">{info}</p>

                                                      <div>
                                                            <Link to="/">
                                                                  <Buttoncontainer>
                                                                        back to products
                                                                  </Buttoncontainer>
                                                            </Link>
                                                            <Buttoncontainer cart disabled={inCart? true: false} onClick={() => {value.addToCart(id); value.openModal(id)}}>
                                                                  {inCart ? "inCart" : "add to cart"}
                                                            </Buttoncontainer>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              )
                        }}
                  </ProductConsumer>
            )
      }
}



export default Details
