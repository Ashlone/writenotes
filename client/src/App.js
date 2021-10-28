import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import NotesPage from "./pages/NotesPage";
import WriteNotePage from "./pages/WriteNotePage";
import styled from "styled-components";
import PrivateRoute from "./routing/PrivateRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Container = styled.div`
  background: #916bbf;
`;
function App() {
  return (
    <Container>
      <Router>
        <Switch>
          <PrivateRoute exact path="/notes" component={NotesPage} />
          <PrivateRoute exact path="/writenote" component={WriteNotePage} />
          <Route exact path="/" component={LandingPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LogInPage} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
