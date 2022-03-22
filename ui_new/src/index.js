import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app/App";

import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducer from "./reducers";

import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
import { Login } from "./app/Login";

const store = createStore(allReducer);

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={App} />
        <Route
          render={() => {
            return <h1>ERROR 404</h1>;
          }}
        />
      </Switch>
    </Provider>
  </Router>,
  document.getElementById("root")
);
