import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

class ComposeSalad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFoundation: "",
      selectedDressing: "",
      foundation: "",
      protein: [],
      extra: [],
      dressing: ""
    };
    this.handleFoundationChange = this.handleFoundationChange.bind(this);
    this.handleProteinChange = this.handleProteinChange.bind(this);
    this.handleExtraChange = this.handleExtraChange.bind(this);
    this.handleDressingChange = this.handleDressingChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFoundationChange(event) {
    this.setState({
      selectedFoundation: event.target.value,
      foundation: event.target.value
    });
  }

  handleProteinChange(event) {
    let newState;
    if (this.state.protein.indexOf(event.target.name) > -1) {
      newState = this.state.protein.filter(
        protein => protein !== event.target.name
      );
    } else {
      newState = this.state.protein;
      newState.push(event.target.name);
    }
    this.setState({ protein: newState });
  }

  handleExtraChange(event) {
    let newState;
    if (this.state.extra.indexOf(event.target.name) > -1) {
      newState = this.state.extra.filter(extra => extra !== event.target.name);
    } else {
      newState = this.state.extra;
      newState.push(event.target.name);
    }
    this.setState({ extra: newState });
  }

  handleDressingChange(event) {
    this.setState({
      selectedDressing: event.target.value,
      dressing: event.target.value
    });
  }

  handleSubmit(event) {
    this.props.newSalad(
      this.state.foundation,
      this.state.protein,
      this.state.extra,
      this.state.dressing
      //this.props.history.push("/compose-salad")
    );

    this.setState({
      selectedFoundation: "-- select an option -- ",
      selectedDressing: "-- select an option --",
      foundation: "",
      protein: [],
      extra: [],
      dressing: ""
    });
    event.preventDefault();
  }

  render() {
    const inventory = this.props.inventory;
    let foundations = Object.keys(inventory).filter(
      name => inventory[name].foundation
    );
    let proteins = Object.keys(inventory).filter(
      name => inventory[name].protein
    );
    let extras = Object.keys(inventory).filter(name => inventory[name].extra);
    let dressings = Object.keys(inventory).filter(
      name => inventory[name].dressing
    );
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <h4>Välj bas</h4>
            <select
              required
              className="form-control"
              value={this.state.selectedFoundation}
              onChange={this.handleFoundationChange}
            >
              <option value="">make a choice...</option>
              {foundations.map(name => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <h4>Välj protein</h4>
            <div className="form-check">
              <div>
                {proteins.map(name => {
                  return (
                    <div key={name}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        key={name}
                        name={name}
                        checked={this.state.protein.indexOf(name) > -1}
                        onChange={this.handleProteinChange}
                      />
                      <label className="form-check-label">{name}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="form-group">
            <h4>Välj tillbehör</h4>
            <div className="form-check">
              <div>
                {extras.map(name => {
                  return (
                    <div key={name}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        key={name}
                        name={name}
                        checked={this.state.extra.indexOf(name) > -1}
                        onChange={this.handleExtraChange}
                      />
                      <label className="form-check-label">{name}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="form-group">
            <h4>Välj dressing</h4>
            <select
              required
              className="form-control"
              value={this.state.selectedDressing}
              onChange={this.handleDressingChange}
            >
              <option value="">make a choice...</option>
              {dressings.map(name => (
                <option key={name} name={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary" value="Submit">
              Create salad
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ComposeSalad;
