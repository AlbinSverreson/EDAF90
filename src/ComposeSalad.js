import React from "react";
import Salad from "./Salad";

class ComposeSalad extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      foundation : "Salad",
      proteins : [],
      extras : [],
      dressing : "",
      price : 0
      //TODO byta arrayerna mot maps
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  clearForm(){
    this.setState({
      foundation : "",
      proteins : [],
      extras : [],
      dressing : "",
      price : 0
    });
  }
  
  handleSelect(event){
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value,
      price: Number(this.state.price) + Number(this.props.inventory[event.target.value].price)
    });
  }

  handleCheckbox(event){
    let name = event.target.getAttribute('name');
    let id = event.target.getAttribute('id');
    
      if(event.target.checked){
        this.setState({
          [name] : [...this.state[name], id],
          price : Number(this.state.price) + Number(this.props.inventory[id].price)
        });
      }
      else{
        this.setState({
          [name] : this.state[name].filter(ingr => ingr !== id),
          price : Number(this.state.price) - Number(this.props.inventory[id].price)
        });
      }
  }

  handleSubmit(event){
    event.preventDefault();
    
    if(event.target.checkValidity() === true){
      let salad = new Salad();

      salad.addOption(this.state.foundation, 1);
      Object.values(this.state.proteins).forEach(protein => salad.addOption(protein));
      Object.values(this.state.extras).forEach(extra => salad.addOption(extra));
      salad.addOption(this.state.dressing, 1);
  
      this.props.addSalad(salad);
      this.clearForm();
      this.props.history.push("/view-order");
    }
    else{
      event.target.classList.add("was-validated");
    }
  }

  render() {
    const inventory = this.props.inventory;
    // test for correct ussage, the parent must send this datastructure
    if (!inventory) {
      alert("inventory is undefined in ComposeSalad");
    }
    let foundations = Object.keys(inventory).filter(
      name => inventory[name].foundation
    );
    let proteins = Object.keys(inventory).filter(
      name => inventory[name].protein
    );
    let extras = Object.keys(inventory).filter(
      name => inventory[name].extra
    );
    let dressings = Object.keys(inventory).filter(
      name => inventory[name].dressing
    );
    return (
      <div className="container"> 
        <form onSubmit={this.handleSubmit} noValidate>
          <h4>Välj bas</h4>
          <div className="form-group">
            <select required
              className = "form-control"
              value = {this.state.foundation}
              name = "foundation"
              onChange = {this.handleSelect}
            >
              <option value=""> Välj bas...</option>
              {foundations.map(name => (
                <option key={name} 
                        value={name}> 
                        {name} 
                </option>
              ))}
            </select>
            <div className="invalid-feedback">
              Välj en bas!
            </div>
          </div>
          <h4>Välj protein</h4>
            {proteins.map(name => (
              <div key={name}>
                <label>
                  <input id = {name}
                         name = "proteins" 
                         type = "checkbox"
                         checked = {this.state.proteins.includes(name) || false} //TODO includes behövs ej när man använder map
                         onChange = {e => this.handleCheckbox(e)}
                  />
                  {' '+name+' +'+inventory[name].price+'kr'}
                </label>
                <br />
              </div>
            ))}
          <h4>Välj extras</h4>
            {extras.map(name => (
              <div key={name}>
                <label>
                  <input id = {name}
                         name = "extras"
                         type = "checkbox"
                         checked = {this.state.extras.includes(name) || false}
                         onChange = {this.handleCheckbox}
                  />
                  {' '+name+' +'+inventory[name].price+'kr'}
                </label>
                <br />
              </div>
            ))}
          <h4>Välj dressing</h4>
          <div className="form-group">
            <select required
              className="form-control"
              value = {this.state.dressing}
              name  = "dressing"
              onChange = {this.handleSelect}
            >
              <option value="">Välj dressing...</option>
              {dressings.map(name => (
                <option 
                        key={name}
                        value={name}>
                        {name}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">
              Välj dressing!
            </div>
          </div>
          <br />
          <br />
          <input type="submit" value="Lägg till"/>
        </form>
      </div>
    );
  }
}

export default ComposeSalad;
