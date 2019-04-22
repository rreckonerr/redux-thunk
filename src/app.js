import React, { Component } from "react";
import NavBar from "./components/nav-bar";
import IndexPage from "./routes/index-page";
import { Route, Switch } from "react-router-dom";
import PostPage from "./routes/post-page";

export class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route path="/posts/:id" component={PostPage} />
        </Switch>
      </>
    );
  }
}

export default App;
