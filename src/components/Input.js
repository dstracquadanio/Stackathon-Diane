import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import $ from "jquery";
import { firestore } from "../firestore";

export default function Input(props) {
  const [response, setResponse] = useState("");
  const [error, setError] = useState(false);
  const network = props.network;

  function handleChange(event) {
    setResponse(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      const output = network.run(event.target.value);
      if (output === "todos") {
        firestore
          .collection(output)
          .add({ name: event.target.value, category: output });
        setResponse("todos");
      } else {
        event.preventDefault();
        $(".error").text("I don't know what that is!");
        setError("yes");
      }
    }
  }

  function handleLearn(event) {
    network.train([{ input: response, output: "todos" }], {
      iterations: 500,
      log: true,
    });
    setError(true);
  }

  // prettier-ignore
  return (
    <div>
      <div className="col align-self-center" onKeyDown={handleKeyDown}>
        <label for="col-form-label" />
        <input type="text" className="form-control text-center" placeholder="Diane, remind me..." 
        value={response} onChange={handleChange} />
          {response === "todos" ? <Redirect to="/todos" /> : ""}
      <div/>
      <div>
        <div className='error' />
        {error ? <button className="btn btn-danger" onClick={handleLearn}>Well, learn it!</button> : ""}
        </div>
      </div>
    </div>
  );
}
