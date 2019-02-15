import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

class ViewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = { displayOrder: false, currentOrder: [] };
    this.newOrder = this.newOrder.bind(this);
    this.postOrder = this.postOrder.bind(this);
  }

  newOrder(event) {
    this.setState({ displayOrder: true, currentOrder: this.props.list });
    this.props.removeOrder();
    //this.props.history.push("/view-order");
  }

  postOrder() {
    if (this.state.displayOrder) {
      return this.state.currentOrder.map(order => {
        return (
          <div key={order.id}>
            <label>
              {order.foundation +
                "," +
                order.protein +
                "," +
                order.extra +
                "," +
                order.dressing}
            </label>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.newOrder}>
          View order
        </button>
        {this.postOrder()}
      </div>
    );
  }
}

export default ViewOrder;
