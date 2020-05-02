import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { Welcome, Todos } from "./components";

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
