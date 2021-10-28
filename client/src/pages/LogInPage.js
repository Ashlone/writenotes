import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Navbar from "../components/Navbar";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.div`
  text-align: center;
  margin-top: 100px;
  color: white;

  span {
    font-size: 1.5rem;
  }
`;

const InputContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 500px;
  color: white;

  input {
    background: white;
    border: none;
    outline: none;
    border-radius: 20px;
    height: 35px;
  }

  button {
    margin-top: 20px;
    width: 100px;
    padding: 10px;
    background: #c996cc;
    border: none;
    border-radius: 20px;
    color: white;
  }
`;

const Content = styled.div`
  margin-top: 20px;
  display: flex;
  span {
    margin-left: 5px;
    color: #1c0c5b;
  }
`;

const PasswordContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  span {
    color: #1c0c5b;
  }
`;

const LogInPage = () => {
  //setting states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      history.push("/notes");
    }
  }, [history]);
  //function to handle log in
  const handleLogin = async (e) => {
    e.preventDefault(); //preventing the page from refreshing
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        "/api/auth/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      localStorage.setItem("userToken", data.token); //adding userInfo to local storage
      history.push("/notes");
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />

      <Container>
        <Title>
          <span>Log In to your account</span>
        </Title>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <InputContainer>
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <PasswordContainer>
            <label>Password</label>
            <span>Forgot Password?</span>
          </PasswordContainer>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <button onClick={handleLogin}>Log In</button>
          <Content>
            <p>Don't have an account?</p>
            <Link style={{ textDecoration: "none" }} to="/signup">
              <span>Sign Up here</span>
            </Link>
          </Content>
        </InputContainer>
      </Container>
    </div>
  );
};

export default LogInPage;
