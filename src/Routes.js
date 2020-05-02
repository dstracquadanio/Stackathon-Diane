import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Todos from "./components/Todos";

export default class Routes extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={Welcome} />
        <Route path="/todos" component={Todos} />
      </Fragment>
    );
  }
}
