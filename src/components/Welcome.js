import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import $ from "jquery";
import brain from "brain.js";
import { firestore } from "../firestore";
const network = new brain.recurrent.LSTM();

export default function Welcome() {
  const [response, setResponse] = useState("");
  const [error, setError] = useState(false);

  console.log(firestore.collection.docs);
  useEffect(() => {
    const data = [
      {
        text: "Fix the lights",
        category: "todos",
      },
      {
        text: "Get a job",
        category: "todos",
      },
      {
        text: "Try something new",
        category: "todos",
      },
      {
        text: "Finish work",
        category: "todos",
      },
    ];

    const trainingData = data.map((item) => ({
      input: item.text,
      output: item.category,
    }));

    network.train(trainingData, {
      iterations: 100,
      log: true,
    });
  }, []);

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
        $(".warning").text("I don't know that!");
        setError(true);
      }
    }
  }

  function handleLearn(event) {
    network.train([{ input: response, output: "todos" }], {
      iterations: 500,
      log: true,
    });
    // firestore.collection("todos").add({ name: response, category: "todos" });
    // setResponse("todos");
  }

  return (
    <div className="container-fluid">
      <div className="row no-gutter">
        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        <div className="col-md-8 col-lg-6">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-12 text-center">
                  <h1 id="welcome" className="typewriter">
                    Hello, Dan.
                  </h1>
                  <form>
                    <div
                      className="form-label-group col-lg-8"
                      onKeyDown={handleKeyDown}>
                      <div />
                      <input
                        type="text"
                        value={response}
                        onChange={handleChange}
                        autoFocus
                      />
                      {response === "todos" ? <Redirect to="/todos" /> : ""}
                      <div className="warning" />
                      <div>
                        {error ? (
                          <button
                            className="btn btn-info"
                            onClick={handleLearn}>
                            Well, learn it!
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="redirect text-center"></div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
