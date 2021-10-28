import { useEffect } from "react";
import image from "../images/notebook.png";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Container = styled.div`
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  span {
    color: #1c0c5b;
    font-size: 2rem;
  }
  p {
    color: white;
  }
`;

const ImageContainer = styled.div`
  width: 500px;

  img {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;

  button {
    margin-left: 20px;
    width: 100px;
    padding: 10px;
    background: #c996cc;
    border: none;
    border-radius: 20px;
    color: white;
  }
`;

const LandingPage = () => {
  let history = useHistory();
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");

    if (userToken) {
      history.push("/notes");
    }
  }, [history]);
  return (
    <div>
      <Navbar />
      <Container>
        <ImageContainer>
          <img src={image} />{" "}
        </ImageContainer>
        <Content>
          <span> The safest app to keep your notes </span>{" "}
          <p> Access your notes anywhere without any worries for free!! </p>{" "}
          <ButtonContainer>
            <Link to="/login">
              <button> Log In </button>{" "}
            </Link>{" "}
            <Link to="/signup">
              <button> Sign Up </button>{" "}
            </Link>{" "}
          </ButtonContainer>{" "}
        </Content>{" "}
      </Container>{" "}
    </div>
  );
};

export default LandingPage;
