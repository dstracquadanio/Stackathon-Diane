import React, { useState, useEffect } from "react";
import { firestore } from "../../firestore";
import axios from "axios";

export default function Todos(props) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [updatedTodo, setUpdatedTodo] = useState("");

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
        } else if (change.type === "modified") {
          setTodos((todos) => {
            todos = todos.filter((todo) => todo.id !== change.doc.id);
            return [...todos, { id: change.doc.id, data: change.doc.data() }];
          });
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(event) {
    setNewTodo(event.target.value);
  }

  function handleEdit(event) {
    setUpdatedTodo(event.target.value);
  }

  async function handleClick(event) {
    event.preventDefault();
    if (!newTodo) return;
    else {
      firestore.collection("todos").add({ name: newTodo });
      // const res = await axios.get();
      // console.log(res);
    }
    setNewTodo("");
  }

  function handleUpdate(event, todo) {
    if (event.keyCode === 13) {
      firestore
        .collection("todos")
        .doc(todo.id)
        .update({
          name: updatedTodo,
        });
      todo.clicked = false;
    }
  }

  function handleDoubleClick(event) {
    let clicked = event.target.textContent;
    clicked = clicked.slice(0, clicked.length - 1);
    let todo = todos.find((todo) => todo.data.name === clicked);
    todo.clicked = true;
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
            <div key={todo.id} className="list-group-item" onDoubleClick={handleDoubleClick}>
              {
                !todo.clicked ? todo.data.name : (
                  <input type="text" value={updatedTodo} onChange={handleEdit} onKeyDown={(event) => handleUpdate(event, todo)} />
                )
              }
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
      </div>
    </div>
  );
}
