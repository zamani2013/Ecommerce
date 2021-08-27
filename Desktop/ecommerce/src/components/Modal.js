import React, { Component } from 'react'
import styled from 'styled-components'
import { ProductConsumer } from '../context'
import { Buttoncontainer } from './Button'
import { Link } from 'react-router-dom'

export default class Modal extends Component {
      render() {
            return (
                  <div>
                        <ProductConsumer>
                              {(value) =>{
                                    const {modalOpen, closeModal} = value;
                                    const {img, title, price} = value.modalProduct;

                                    if(!modalOpen){
                                          return null;
                                    }
                                    else{
                                          return(
                                          <ModalContainer>
                                                <div className="container">
                                                      <div className="row">
                                                            <div id="modal" className="col-8 mx-auto p-5 col-md-6 col-lg-4 text-center text-capitalize">
                                                                  <h5>item added to the cart</h5>
                                                                  <img src={img} className="img-fluid" alt="product"/>
                                                                  <h5>{title}</h5>
                                                                  <h5 className="text-muted lead">price : $ {price}</h5>
                                                                  <Link to="/">
                                                                        <Buttoncontainer onClick={() => closeModal()}>
                                                                              Continue Shopping
                                                                        </Buttoncontainer>
                                                                  </Link>
                                                                  <Link to="/cart">
                                                                        <Buttoncontainer cart onClick={() => closeModal()}>
                                                                              go to cart
                                                                        </Buttoncontainer>
                                                                  </Link>
                                                            </div>
                                                      </div>
                                                </div>
                                          </ModalContainer>
                                          )
                                    }
                                    
                              }}
                        </ProductConsumer>
                  </div>
            )
      }
}

const ModalContainer = styled.div`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;

      #modal{
            background: var(--mainWhite);
      }
`;