import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { css } from "@emotion/core";
import CheckBox from "@material-ui/core/Checkbox";
import Axios from "axios";
import { getTodosAction } from "../Redux/app";
import { useSelector, useDispatch } from "react-redux";

const arr = ["Learn Python", "Work Hard"];

export default function Todos() {
  function getTodos() {
    Axios.get("/todos").then((res) => {
      dispatch(getTodosAction(res.data));
    });
  }
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <ul className="list-group mt-5">
      {todos.length > 0
        ? todos[0].map((todo) => (
            <li
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
              key={todo._id}
              className="flex-column font-weight-normal border border-dark mb-4   mt-4 list-group-item d-flex justify-content-between align-items-center"
            >
              <div
                style={{ width: "100%" }}
                className="d-flex justify-content-between flex-row"
              >
                {todo.todo}
                <CheckBox
                  checked={todo.completed}
                  onClick={() => {
                    Axios.put(`/todos/update/${todo._id}`, {
                      todo: todo.todo,
                      importance: todo.importance,
                      completed: !todo.completed,
                    }).then((res) => console.log(res));
                  }}
                  color="default"
                  type="checkbox"
                  className="checkBoxes"
                  size="medium"
                ></CheckBox>
              </div>
              <div className="progress mt-2" style={{ width: "100%" }}>
                <div
                  className={`progress-bar progress-bar-striped progress-bar-animated bg-${
                    todo.importance === 1
                      ? "success"
                      : todo.importance === 2
                      ? "info"
                      : todo.importance === 3
                      ? "warning"
                      : todo.importance === 4
                      ? "danger"
                      : "danger"
                  }`}
                  role="progressbar"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: todo.importance * 20 + "%" }}
                ></div>
              </div>
            </li>
          ))
        : "waiting for database..."}
    </ul>
  );
}
