import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './routes/home'
import User from './routes/user'
import Detail from './routes/detail'
import Seat from './routes/seat'

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path="/" component={Home} />
          <Route exact path="/user" component={User} />
          <Route exact path="/detail" component={Detail} />
          <Route exact path="/seat" component={Seat} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
