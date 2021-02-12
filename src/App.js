//import logo from './logo.svg';
import './App.css';
import Order from "./Order";
import ComposeSaladModal from "./ComposeSaladModal";
import ComposeSalad from "./ComposeSalad";
import React from "react";
import inventory from "./inventory.ES6.js";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      order: []
    });
    this.addSalad = this.addSalad.bind(this);
  }
  
  addSalad = (salad) => { 
    this.setState(currentState => {
        currentState.order = [...this.state.order, salad];
        return currentState;
    });
  }
  
  render() {
    const composeSaladElem = (params) => <ComposeSalad {...params} inventory={inventory}
          addSalad={this.addSalad} />;
    
    const viewOrderElem = (params) => <Order {...params} order={this.state.order}/>;
    return (
     <Router> 
        <div>
          <div className="jumbotron text-center">
            <h1 className="display-4">Salad maker 3000</h1>
            <p className="lead">
              Gör din egen salladsjävel.
            </p>
            <hr className="my-4" />
            <p>Detta är lab 3 i EDAF90.</p>
          </div>

          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <Link className="nav-item" to="compose-salad">
                Komponera din egen sallad
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-item" to="view-order">
                Visa beställning
              </Link>
            </li>
          </ul>
          <hr className="my-4" />
          <Route path ="/compose-salad" render={composeSaladElem}/>
          <Route path ="/view-order" render={viewOrderElem}/>
        </div>
      </Router>
    );
  }
  
}

export default App;
