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
        $("#diane").toggleClass("form-control is-invalid text-center");
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
            <div className="valid-feedback">Should be good!</div>
            <div className="invalid-feedback">I don't know that!</div>
            <div>
            {error ? <button className="btn btn-info" onClick={handleLearn}>Well, learn it!</button> : ""}
          </div>
        </div>
    </div>
  );
}
