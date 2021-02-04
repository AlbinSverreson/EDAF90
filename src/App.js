import logo from './logo.svg';
import './App.css';
import Order from "./Order";
import ComposeSaladModal from "./ComposeSaladModal";
import React from "react";
import inventory from "./inventory.ES6.js";

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      order: []
    });
    this.addSalad = this.addSalad.bind(this);
  }
  
  addSalad = (salad) => {
    this.setState({order : [...this.state.order, salad]});
  }
  
  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1 className="display-4">Salad maker 3000</h1>
          <p className="lead">
            Gör din egen salladsjävel.
          </p>
          <hr className="my-4" />
          <p>Detta är lab 2 i EDAF90.</p>
        </div>
        <ComposeSaladModal inventory={inventory} addSalad={this.addSalad} />
        <Order order={this.state.order} />
      </div>
    );
  }
  
}

export default App;
