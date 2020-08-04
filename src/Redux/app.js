const { combineReducers } = require("redux");

const GET_TODOS = "GET_TODOS";

const initialState = {
  todos: [],
};

export const getTodosAction = (todos) => ({
  type: GET_TODOS,
  todos,
});

const getTodosReducer = (state = initialState.todos, action) => {
  switch (action.type) {
    case GET_TODOS:
      return [action.todos];
    default:
      return state;
  }
};

const allReducers = combineReducers({
  todos: getTodosReducer,
});

export default allReducers;
