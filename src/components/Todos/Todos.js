import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../../firestore";

export default function Todos(props) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    firestore.collection("todos").onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        if (change.type === "added") {
          setTodos((todos) => [
            ...todos,
            { id: change.doc.id, data: change.doc.data() },
          ]);
        } else if (change.type === "removed") {
          setTodos((todos) =>
            todos.filter((todo) => todo.id !== change.doc.id)
          );
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(event) {
    setNewTodo(event.target.value);
  }

  async function handleClick(event) {
    event.preventDefault();
    if (!newTodo) return;
    else {
      firestore.collection("todos").add({ name: newTodo });
    }
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

  // prettier-ignore
  return (
    <div className="whole-screen">
      <div className="list-group">
        {todos.map((todo) => {
          return (
            <div key={todo.id} className="list-group-item">
              {todo.data.name}
              <button type="button" className="close" onClick={handleRemove} value={todo.id}>
                &times;
              </button>
            </div>
          );
        })}
        <input type="text" className="text-center" placeholder="add todo" value={newTodo} 
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" className="btn-small bg-primary" onClick={handleClick}>
          Add
        </button>
        <Link to="/">Back</Link>
      </div>
    </div>
  );
}
