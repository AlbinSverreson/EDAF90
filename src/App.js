//import logo from './logo.svg';
import './App.css';
import Order from "./Order";
import ComposeSaladModal from "./ComposeSaladModal";
import ComposeSalad from "./ComposeSalad";
import React from "react";
//import inventory from "./inventory.ES6.js";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = ({
      order: [],
      inventory: {}
    });
    this.addSalad = this.addSalad.bind(this);
  }

  componentDidMount() {
    var oldOrder = JSON.parse(localStorage.getItem("order"));
    if(oldOrder != null){
      this.setState({order: oldOrder});
    }

    var server = "http://localhost:8080/";
    var urls = ["foundations", "proteins", "extras", "dressings"];
    var inventory = {};
    
    Promise.all(urls.map(url => {
      return fetch(server+url)
      .then(res => res.json())
      .then(items=>{
        return Promise.all(items.map(i => {
          return fetch(server+url+"/"+i)
          .then(res => res.json())
          .then(ingr => inventory[i]=ingr)
        }))
      })
    })).then(()=>this.setState({inventory}));
  }

  
  addSalad = (salad) => { 
    this.setState(currentState => {
        currentState.order.push(salad);
        localStorage.setItem("order", JSON.stringify(currentState.order));
        
    });

    fetch("http://localhost:8080/orders/", {
      method: "POST",
      headers: new Headers(),
      mode: "cors",
      cache: "default",
      body: JSON.stringify(this.state.orders)
    })
      .then(res => res.json())
      .then(data => console.log(JSON.stringify(data)))
      .catch(error => console.error(error));
  }
  
  render() {
    const composeSaladElem = (params) => <ComposeSalad {...params} inventory={this.state.inventory}
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
            <p>Detta är labbuppgiften i EDAF90.</p>
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
