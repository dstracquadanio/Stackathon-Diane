import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import $ from "jquery";

export default function Welcome() {
  const [response, setResponse] = useState("");

  function welcomeMessage() {
    const welcome = document.getElementById("welcome");
    $("#welcome")
      .fadeOut(4000, function() {
        welcome.classList.remove("typewriter");
        void welcome.offsetWidth;
        $(this).text("What Can I Do For You Today?");
      })
      .fadeIn(2000);
  }

  function handleChange(event) {
    setResponse(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      if (response.includes("todos" || "list" || "to-do")) {
        setResponse("todos");
      } else {
        $(".redirect")
          .text("I Don't Know What That Is, Dan.")
          .fadeIn(1000);
      }
    }
  }

  // prettier-ignore
  return (
    <div className="whole-screen">
      <div>
        <h1 id="welcome" className="typewriter" onAnimationEnd={welcomeMessage}>Hello, Dan.</h1>
      </div>
      <div id="diane" onKeyDown={handleKeyDown} className="response">
        <input type="text" value={response} onChange={handleChange} autoFocus/>
        <div className="redirect text-center">
        {
          response === 'todos' ? <Redirect to="/todos" /> : ''
        }
        </div>
      </div>
    </div>
  );
}
