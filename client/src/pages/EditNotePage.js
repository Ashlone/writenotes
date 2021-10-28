/**import { useState, useEffect } from "react";
import styled from "styled-components";
import { Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
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
const EditNotePage = (props) => {
  const [note, setNote] = useState({
    title: "",
    description: "",
  });
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState("");
  const { title, description } = note;

  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    Notes();
  }, []);

  const Notes = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    };

    axios
      .get("/api/notes" + id, config)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const handle = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <NotesNavbar />
      <MainContainer>
        <Container>
          <Form style={{ width: "100%" }}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "white" }}></Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => handle(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "white" }}></Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={description}
                onChange={(e) => handle(e)}
              />
            </Form.Group>
          </Form>
          <button onClick={handleUpdate}>Save Changes</button>
        </Container>
      </MainContainer>
    </div>
  );
};

export default EditNotePage*/
