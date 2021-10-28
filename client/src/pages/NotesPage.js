import { useState, useEffect } from "react";
import NotesNavbar from "../components/NotesNavbar";
import Loading from "../components/Loading";
import styled from "styled-components";
import Fontawesome from "react-fontawesome";
import { Accordion } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Notes = styled.div``;
const Button = styled.button`
  margin-left: 50px;
  margin-top: 50px;
  width: 150px;
  padding: 10px;
  background: #c996cc;
  border: none;
  border-radius: 20px;
  color: white;
`;
const MiniContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: none;
`;

const NotesPage = () => {
  //States

  const [api, setApi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const history = useHistory();

  // fetching data if there is a token in the localStorage
  //Note that l set the loading to false when the data has been fetched
  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      history.push("/");
    }

    const fetchNotes = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/notes", config);
        console.log(data);
        setApi(data);
        setLoading(false);
      } catch (error) {
        localStorage.removeItem("userToken");
        setError("You are not authorized please login");
      }
    };
    fetchNotes();
  }, [history]);

  //This function fetches data when a note is deleted
  const finalFetch = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    };

    try {
      const { data } = await axios.get("/api/notes", config);
      console.log(data);
      setApi(data);
    } catch (error) {
      localStorage.removeItem("userToken");
      setError("You are not authorized please login");
    }
  };

  //This function is called when deleting a note
  const handledelete = async (_id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    };
    try {
      const { data } = await axios.delete(`/api/notes/${_id}`, config);
      console.log(data);
      finalFetch();
    } catch (error) {
      setError("You are not authorized please login");
    }
  };

  return (
    <Notes>
      <NotesNavbar />
      <Link to="/writenote">
        <Button>Write a note</Button>
      </Link>
      {loading && <Loading />}
      {api.map((notes) => {
        return (
          <Accordion style={{ margin: "30px" }}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{notes.title}</Accordion.Header>
              <Accordion.Body style={{ color: "white" }}>
                {notes.description}
                <MiniContainer>
                  <Fontawesome
                    onClick={() => handledelete(notes._id)}
                    name="trash"
                    style={{
                      fontSize: "25px",
                      marginLeft: "10px",
                      color: "black",
                    }}
                  />
                </MiniContainer>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      })}
    </Notes>
  );
};

export default NotesPage;
