import React from "react";
import "./App.css";
import firestore from "./firestore";

function App() {
  const todoList = async () => {
    let todos = firestore.collection("todos");
    let todoList = await todos.get();
    todoList.docs.forEach((doc) => console.log(doc.data()));
  };
  todoList();
  return <div className="App"></div>;
}

export default App;
