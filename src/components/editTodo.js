import React, { useEffect } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getTodosAction } from "../Redux/app";
import { Button } from "@material-ui/core";

export default function EditTodo() {
  const todos = useSelector((state) => state.todos);
  const getTodos = () => {
    Axios.get("/todos").then((res) => dispatch(getTodosAction(res.data)));
  };
  useEffect(() => {
    getTodos();
  });

  const dispatch = useDispatch();
  return (
    <div>
      {todos.length > 0
        ? todos[0].map((todo) => (
            <div className="container d-flex mt-5 flex-column">
              <input
                className="animated shake form-control form-control-lg"
                type="text"
                defaultValue={todo.todo}
                onClick={(e) => (e.target.value = "")}
              />
              <Button
                className="mt-2"
                onClick={(e) => {
                  Axios.put("/todos/update/" + todo._id, {
                    todo: e.target.parentNode.children[0].value,
                    importance: 2,
                    completed: false,
                  });
                }}
              >
                Edit
              </Button>
              <Button
                className="mt-2"
                onClick={() =>
                  Axios.delete(`/todos/delete/${todo._id}`, {
                    todo: todo.todo,
                    importance: todo.importance,
                    completed: todo.completed,
                  }).then((res) => console.log(res))
                }
              >
                Delete
              </Button>
              <div className="progress mt-2">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: 20 * todo.importance + "%" }}
                ></div>
              </div>
            </div>
          ))
        : "Wating"}
    </div>
  );
}
