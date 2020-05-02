import React, { useState } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

export default function Welcome() {
  const [message, setMessage] = useState("Hello, Dan.");
  const [response, setResponse] = useState("");

  function welcomeMessage() {
    if (message !== "Hello, Dan.") return;
    const welcome = document.getElementById("welcome");
    $("#welcome")
      .fadeOut(4000, function() {
        welcome.classList.remove("typewriter");
        void welcome.offsetWidth;
        $(this).text("What Can I Do For You Today?");
      })
      .fadeIn(3000, function() {
        $("#diane")
          .text("Diane, ")
          .fadeIn(1000);
      });
  }

  // prettier-ignore
  return (
    <div className="whole-screen">
      <div>
        <h1 id="welcome" className="typewriter" onAnimationEnd={welcomeMessage}>Hello, Dan.</h1>
      </div>
      <div id="diane" className="typewriter">
        <input type="text" className="response" autoFocus/>
      </div>
    </div>
  );
}

{
  /* <Link to="/todos">View Your Todos</Link> */
}
