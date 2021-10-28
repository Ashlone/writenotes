import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
const Container = styled.div`
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  color: white;
  font-size: 2rem;

  span {
    color: #1c0c5b;
  }
`;

const Notes = styled.div`
  color: white;
  font-size: 1.2rem;
`;

const UserProfile = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  color: white;
`;

const NotesNavbar = () => {
  let history = useHistory();
  //Logout function
  const logouthandler = () => {
    localStorage.removeItem("userToken");
    history.push("/");
  };
  return (
    <Container>
      <Logo>
        WriteNotes<span>.com</span>
      </Logo>

      <Link to="/notes" style={{ textDecoration: "none" }} to="/">
        <Notes>Notes</Notes>
      </Link>
      <UserProfile onClick={logouthandler}>Log Out</UserProfile>
    </Container>
  );
};

export default NotesNavbar;
