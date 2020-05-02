import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  const [message, setMessage] = useState("Hello, Dan.");

  return (
    <div className="whole-screen">
      <div className="typewriter">
        <h1>{message}</h1>
        <Link to="/todos">View Your Todos</Link>
      </div>
    </div>
  );
}
