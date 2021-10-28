import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Container = styled.div`
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Help = styled.span`
  color: white;
`;

const Logo = styled.div`
  color: white;
  font-size: 2rem;

  span {
    color: #1c0c5b;
  }
`;
const Navbar = () => {
  return (
    <Container>
      <Link style={{ textDecoration: "none" }} to="/">
        <Logo>
          WriteNotes<span>.com</span>
        </Logo>
      </Link>

      <Help>Help?</Help>
    </Container>
  );
};

export default Navbar;
