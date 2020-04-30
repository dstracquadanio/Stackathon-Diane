import React from "react";

export default function Todo(props) {
  return (
    <div>
      {props.todos.map((todo) => (
        <h1>{todo.name}</h1>
      ))}
    </div>
  );
}
