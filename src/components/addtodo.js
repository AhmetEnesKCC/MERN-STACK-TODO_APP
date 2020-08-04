import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faExclamation } from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Todos from "./Todos";
import "bootstrap/js/dist/util";
import { getTodosAction } from "../Redux/app";
import "bootstrap/dist/js/bootstrap.bundle";
export default function AddTodo() {
  const [todoRight, setTodoRight] = useState(true);
  const todos = useSelector((state) => state.todos);
  const [importance, setImportance] = useState(0);
  const getTodos = () => {
    Axios.get("/todos").then((res) => dispatch(getTodosAction(res.data)));
  };
  const dispatch = useDispatch();
  useEffect(() => {
    getTodos();
    add_note.current.focus();
  }, []);
  const add_note = useRef();

  return (
    <div
      className="container d-flex align-center justify-content-around flex-column"
      style={{ height: "80vh", alignItems: "center" }}
    >
      <div
        className="container d-flex flex-column"
        style={{
          position: "relative",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <input
          ref={add_note}
          type="text"
          className="form-control form-control-lg"
        />

        <Button
          onClick={(e) => {
            if (
              add_note.current.value.trim() !== "" &&
              !todos[0].some(
                (todo) => todo.todo === add_note.current.value.trim()
              )
            ) {
              Axios.post("/todos/add", {
                todo: add_note.current.value.trim(),
                importance: importance,
                completed: false,
              });
              setTodoRight("added");
            } else if (
              todos[0].some(
                (todo) => todo.todo === add_note.current.value.trim()
              ) === true
            ) {
              setTodoRight("exist");
            } else if (add_note.current.value.trim() === "") {
              setTodoRight(false);
            }
          }}
          style={{
            outline: "none",
            position: "absolute",
            right: 20,
            top: 10,
          }}
          color="primary"
        >
          Add
        </Button>
        <div
          className="dropdown"
          style={{
            position: "absolute",
            padding: 20,
            top: 50,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ width: "100%", boxSizing: "border-box" }}
          >
            Importance
          </button>
          <div
            className="dropdown-menu"
            style={{ width: "100%", textAlign: "center" }}
            aria-labelledby="dropdownMenu2"
          >
            <button
              onClick={() => {
                setImportance(1);
              }}
              className="dropdown-item"
              type="button"
            >
              not important
            </button>
            <button
              onClick={() => {
                setImportance(2);
              }}
              className="dropdown-item"
              type="button"
            >
              important
            </button>
            <button
              onClick={() => {
                setImportance(3);
              }}
              className="dropdown-item"
              type="button"
            >
              very important
            </button>
            <button
              onClick={() => {
                setImportance(4);
              }}
              className="dropdown-item"
              type="button"
            >
              critic
            </button>
            <button
              onClick={() => {
                setImportance(5);
              }}
              className="dropdown-item"
              type="button"
            >
              very critic
            </button>
          </div>
        </div>
      </div>

      {
        <div
          className={`alert alert-${
            todoRight === false
              ? "danger"
              : todoRight === "exist"
              ? "warning"
              : "success"
          }`}
          role="alert"
          style={{
            position: "absolute",
            top: 100,
            display: todoRight === true ? "none" : "block",
          }}
        >
          <h4 className="alert-heading">
            {todoRight === false
              ? "Alert !"
              : todoRight === "exist"
              ? "Woops"
              : todoRight === true
              ? "Add an todo"
              : "Great !"}
          </h4>
          <p>
            {todoRight === false
              ? "You must enter a todo before click add."
              : todoRight === "exist"
              ? "Look like there is same todo in todo list"
              : "Todo added succesfully"}
          </p>
        </div>
      }
    </div>
  );
}
