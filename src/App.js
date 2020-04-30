import React, { useState, useEffect } from "react";
import "./App.css";
import firestore from "./firestore";
import Todo from "./Todo/Todo";

export default function App() {
  const [todos, setTodo] = useState([]);
  useEffect(() => {
    async function getData() {
      let data = firestore.collection("todos");
      let list = await data.get();
      list.docs.forEach((todo) => setTodo((todos) => [...todos, todo.data()]));
    }
    getData();
  }, []);
  return (
    <div>
      {todos.map((todo) => (
        <h1>{todo.name}</h1>
      ))}
      <Todo />
    </div>
  );
}
