// import React from "react";
// import firestore from "../../firestore";
// import Todos from "./Todos";

// const TodosFunc = () => {
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState("");
//   const [updatedTodo, setUpdatedTodo] = useState("");
//   const [doubleClick, setDoubleClick] = useState(false);

//   const getTodos = firestore.collection("todos").onSnapshot((snapshot) => {
//     let changes = snapshot.docChanges();
//     changes.forEach((change) => {
//       if (change.type === "added") {
//         setTodos((todos) => [
//           ...todos,
//           { id: change.doc.id, data: change.doc.data() },
//         ]);
//       } else if (change.type === "removed") {
//         setTodos((todos) => todos.filter((todo) => todo.id !== change.doc.id));
//       } else if (change.type === "modified") {
//         setTodos((todos) => {
//           todos = todos.filter((todo) => todo.id !== change.doc.id);
//           return [...todos, { id: change.doc.id, data: change.doc.data() }];
//         });
//       }
//     });
//   });

//   function handleChange(event) {
//     setNewTodo(event.target.value);
//   }

//   function handleEdit(event) {
//     setUpdatedTodo(event.target.value);
//   }

//   function handleClick(event) {
//     event.preventDefault();
//     if (!newTodo) return;
//     else firestore.collection("todos").add({ name: newTodo });
//     setNewTodo("");
//   }

//   function handleUpdate(event, todo) {
//     if (event.keyCode === 13) {
//       firestore
//         .collection("todos")
//         .doc(todo.id)
//         .update({
//           name: updatedTodo,
//         });
//       todo.clicked = false;
//     }
//   }

//   function handleDoubleClick(event) {
//     setDoubleClick(true);
//     let clicked = event.target.textContent;
//     clicked = clicked.slice(0, clicked.length - 1);
//     let todo = todos.find((todo) => todo.data.name === clicked);
//     todo.clicked = true;
//   }

//   function handleKeyDown(event) {
//     if (event.keyCode === 13) handleClick(event);
//   }

//   function handleRemove(event) {
//     event.preventDefault();
//     firestore
//       .collection("todos")
//       .doc(event.target.value)
//       .delete();
//   }

//   return (
//     <Todos
//       todos={todos}
//       updatedTodo={updatedTodo}
//       newTodo={newTodo}
//       getTodos={getTodos}
//       handleChange={handleChange}
//       handleEdit={handleEdit}
//       handleClick={handleClick}
//       handleUpdate={handleUpdate}
//       handleDoubleClick={handleDoubleClick}
//       handleKeyDown={handleKeyDown}
//       handleRemove={handleRemove}
//     />
//   );
// };
