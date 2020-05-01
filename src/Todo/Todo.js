import React, { useState, useEffect } from "react";
import firestore from "../firestore";

export default function Todo(props) {
  const [todos, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    firestore.collection("todos").onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        if (change.type === "added") {
          setTodo((todos) => [
            ...todos,
            { id: change.doc.id, data: change.doc.data() },
          ]);
        } else if (change.type === "removed") {
          setTodo((todos) => todos.filter((todo) => todo.id !== change.doc.id));
        }
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

  function handleRemove(event) {
    event.preventDefault();
    firestore
      .collection("todos")
      .doc(event.target.value)
      .delete();
  }

  return (
    <div>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            {todo.data.name}
            <button type="button" value={todo.id} onClick={handleRemove}>
              x
            </button>
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
