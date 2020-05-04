import React, { useEffect } from "react";
import brain from "brain.js";
import Input from "./Input";
const network = new brain.recurrent.LSTM();

export default function Welcome() {
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
                  <Input network={network} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
