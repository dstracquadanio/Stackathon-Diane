import React, { useState, useEffect } from "react";
import firestore from "../firestore";

export default function Todos(props) {
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

  function handleClick(event) {
    event.preventDefault();
    if (!newTodo) return;
    else firestore.collection("todos").add({ name: newTodo });
    setNewTodo("");
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) handleClick(event);
  }

  function handleRemove(event) {
    event.preventDefault();
    firestore
      .collection("todos")
      .doc(event.target.value)
      .delete();
  }

  return (
    <div className="container">
      <div className="text-center">
        {todos.map((todo) => {
          return (
            <div key={todo.id} className="col-lg-3" onDoubleClick={() => true}>
              {todo.data.name}
              <button
                type="button"
                className="close"
                onClick={handleRemove}
                value={todo.id}>
                &times;
              </button>
            </div>
          );
        })}
        <input
          type="text"
          className="text-center"
          placeholder="add todo"
          value={newTodo}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          type="submit"
          className="btn-small bg-primary"
          onClick={handleClick}>
          Add
        </button>
      </div>
    </div>
  );
}
