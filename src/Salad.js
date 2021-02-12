import inventory from "./inventory.ES6.js";
let options = Object.keys(inventory);

let foundations = options.filter(ingr => inventory[ingr]['foundation']);
let extras = options.filter(ingr => inventory[ingr]['extra']);
let proteins = options.filter(ingr => inventory[ingr]['protein']);
let dressings = options.filter(ingr => inventory[ingr]['dressing'])

class Salad{
  static globalId = 1;
  constructor(){
    this.options = [];
    this.foundation = "";
    this.proteins = [];
    this.extras = [];
    this.dressing = "";
    this.id = Salad.newId();
  }
  
  static newId(){
    return this.globalId++;
  }

  addOption(option){
    if(foundations.includes(option)){ this.foundation = option; }
    else if(proteins.includes(option)){ this.proteins.push(option); }
    else if(extras.includes(option)){ this.extras.push(option); }
    else if(dressings.includes(option)){ this.dressing = option; }
    
    this.options.push({...inventory[option]}) 
  } 
  
  removeOption(option) { this.options = this.options.filter(opt => opt !== option); }

  price(){ return this.options.reduce((acc, opt) => acc + Number(opt['price']), 0) }

  toString(){
    let proteinString = "";
    let extraString = "";
    if(this.proteins.length !== 0){
       proteinString = this.proteins.reduce((acc, prot) => acc + ", " + prot) + ", ";
    }
    if(this.extras.length !== 0){
       extraString = this.extras.reduce((acc, extra) => acc + ", " + extra) + ", ";
    }
    return( this.foundation + ", " +
            proteinString +
            extraString +
            this.dressing + " " + 
            this.price() + "kr"
          );
  }

}

export default Salad;
