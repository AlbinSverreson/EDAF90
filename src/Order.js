import React from "react";

class Order extends React.Component{
  /*constructor(props){
    super(props)
  }*/
  render(){
    return(
      <div className="container">
        <h4> Order </h4>
        <ul>
          {this.props.order.map(salad => (
            <li key={salad.ID}> {salad.ID + ") " 
                                + salad.foundation + ", " 
                                + salad.proteins + ", " 
                                + salad.extras + ", " 
                                + salad.dressing} </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Order;
