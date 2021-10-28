import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Form } from "react-bootstrap";
import Loading from "../components/Loading";
import NotesNavbar from "../components/NotesNavbar";

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;

  button {
    margin-top: 20px;
    width: 150px;
    padding: 10px;
    background: #c996cc;
    border: none;
    border-radius: 20px;
    color: white;
  }
`;
const Title = styled.div`
  text-align: center;
  margin-top: 100px;
  color: white;

  span {
    font-size: 1.5rem;
  }
`;

const MainContainer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;
const WriteNotePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        "/api/notes/create",
        {
          title,
          description,
        },
        config
      );

      console.log(data);
      alert("Note created successful");
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div>
      <NotesNavbar />
      {loading && <Loading />}
      <MainContainer>
        <Container>
          <Form style={{ width: "100%" }}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "white" }}>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "white" }}>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
          <button onClick={handleCreateNote}>Save Note</button>
        </Container>
      </MainContainer>
    </div>
  );
};

export default WriteNotePage;
