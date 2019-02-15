import React, { Component } from "react";
import ComposeSalad from "./Components/ComposeSalad";
import ViewOrder from "./Components/ViewOrder";
import inventory from "./inventory.ES6";
import shortId from "../node_modules/shortid";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { list: [] };
    this.createSalad = this.createSalad.bind(this);
    this.removeOrder = this.removeOrder.bind(this);
  }

  createSalad(found, prot, extr, dress) {
    let temp = this.state.list;
    temp.push({
      id: shortId.generate(),
      foundation: found,
      protein: prot,
      extra: extr,
      dressing: dress
    });
    this.setState({ list: temp });
  }

  removeOrder() {
    this.setState({ list: [] });
  }

  render() {
    const composeSaladElem = params => (
      <ComposeSalad inventory={inventory} newSalad={this.createSalad} />
    );
    const viewOrderElem = params => (
      <ViewOrder list={this.state.list} removeOrder={this.removeOrder} />
    );
    return (
      <Router>
        <div>
          <div className="jumbotron text-center">
            <h1>My Own Salad Bar</h1>
            <p>Here you can order custom made salads!</p>
          </div>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link className="nav-link" to="compose-salad">
                Komponera din egen sallad
              </Link>
              <Link className="nav-link" to="view-order">
                View order
              </Link>
            </li>
          </ul>
          <Route path="/compose-salad" render={composeSaladElem} />
          <Route path="/view-order" render={viewOrderElem} />
        </div>
      </Router>
    );
  }
}

export default App;
