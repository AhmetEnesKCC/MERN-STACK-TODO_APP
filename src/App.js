import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { faPlusSquare, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AddTodo from "./components/addtodo";
import Todos from "./components/Todos";
import EditTodo from "./components/editTodo";

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-around">
          <Link className="navbar-brand" to="/">
            My Todos
          </Link>
          <Link className="navbar-brand" to="/addTodo">
            Add Todo
            <FontAwesomeIcon className="ml-2" icon={faPlusSquare} />
          </Link>
          <Link className="navbar-brand ml-3" to="/editTodo">
            Edit Todo
            <FontAwesomeIcon className="ml-2" icon={faEdit} />
          </Link>
        </nav>
        <Route path="/" exact component={Todos}></Route>
        <Route path="/addTodo" component={AddTodo}></Route>
        <Route path="/editTodo" component={EditTodo}></Route>
      </div>
    </Router>
  );
}

export default App;
