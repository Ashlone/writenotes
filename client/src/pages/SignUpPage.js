import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
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
  label {
    margin-top: 20px;
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

const SignUpPage = () => {
  //setting states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      history.push("/notes");
    }
  }, [history]);

  //function that handles sign up

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do no match");
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        setLoading(true);
        const { data } = await axios.post(
          "/api/auth/register",
          {
            username,
            email,
            password,
          },
          config
        );
        console.log(data);
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        alert("You have successfully created an account");
        history.push("/login");
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <Navbar />

      <Container>
        <Title>
          <span>Create an account</span>
        </Title>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger"> {message} </ErrorMessage>}
        {loading && <Loading />}
        <InputContainer>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirm Password</label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
          />
          <button onClick={handleSignUp}>Sign Up</button>
          <Content>
            <p>Already have an account?</p>
            <Link style={{ textDecoration: "none" }} to="/login">
              <span>Log In here</span>
            </Link>
          </Content>
        </InputContainer>
      </Container>
    </div>
  );
};

export default SignUpPage;
