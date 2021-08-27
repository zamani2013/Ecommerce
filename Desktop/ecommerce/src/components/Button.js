import styled from "styled-components";

export const Buttoncontainer = styled.button`
      text-transform: capitalize;
      font-siz: 1.4rem;
      background: transparent;
      border: 0.05rem solid var(--lightBlue);
      border-color: ${props => props.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
      color: ${props => props.cart ? "var(--mainYellow)": "var(--lightBlue)"};
      border-radius: 0.5rem;
      padding: 0.2rem 0.5rem;
      cursor: pointer;
      margin: 0.2rem 0.5rem 0.2rem 0;
      transition: all 1s ease-in-out;
      &:hover{
            background: ${props => props.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
            color: var(--mainBlue);
            transform: ${props => props.carts ? "scale(1.5)" : "scale(1.1)"};
      }
      &:focus{
            outline: none;
      }

`;
