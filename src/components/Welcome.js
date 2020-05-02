import React from "react";
import { Link } from "react-router-dom";

export default function Welcome(props) {
  return (
    <div className="container">
      <div className="text-center">
        <h1>Welcome, Dan</h1>
        <Link to="/todos">View Your Todos</Link>
      </div>
    </div>
  );
}
