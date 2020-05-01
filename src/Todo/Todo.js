import React, { useState, useEffect } from "react";
import firestore from "../firestore";

export default function Todo(props) {
  const [todos, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    firestore.collection("todos").onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        if (change.type === "added")
          setTodo((todos) => [...todos, change.doc.data()]);
      });
    });
  }, []);

  function handleChange(event) {
    setNewTodo(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    firestore.collection("todos").add({ name: newTodo });
    setNewTodo("");
  }

  console.log(todos);
  return (
    <div>
      {todos.map((todo) => {
        return (
          <div>
            <h1>{todo.name}</h1>
          </div>
        );
      })}
      <input
        type="text"
        placeholder="add todo"
        value={newTodo}
        onChange={handleChange}
      />
      <button type="button" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
}
