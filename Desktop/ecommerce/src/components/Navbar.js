import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg'
import styled from 'styled-components'
import { Buttoncontainer } from './Button'

export class Navbar extends Component {
      render() {
            return (
                  <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
                        {/*    
                         https://www.iconfinder.com/icons/1243689/call_phone_icon
                        Creative Commons (Attribution 3.0 Unported);
                        https://www.iconfinder.com/Makoto_msk 
                        */}
                        <Link to="/">
                              <img src={logo} alt="Store" className="navbar-brand" />
                        </Link>
                        <ul className="navbar-nav align-items-center">
                              <li className="nav-item ml-5">
                                    <Link to="/" className="nav-link">
                                          Products
                                    </Link>
                              </li>
                        </ul>
                        <Link to="/cart" className="mlauto">
                              <Buttoncontainer carts>
                                    <span className="m-1"><i className="fas fa-shopping-basket"></i></span>
                                    my-cart
                              </Buttoncontainer>
                        </Link>
                    </NavWrapper>
            )
      }
}

const NavWrapper = styled.nav`
      background: var(--mainBlue);
      .nav-link{
            color: var(--mainWhite) !important;
            font-size: 1.3rem;
            text-transform: capitalize;
      }
`;

export default Navbar
