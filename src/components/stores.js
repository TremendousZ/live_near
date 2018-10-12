import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Stores extends Component{
    constructor(props){
        super(props);

        this.state = {
            storeCategory: "all",
        }
    }

    handleChange(event){
        switch(event.target.value){
            case "all":
                this.setState(
                    {storeCategory: event.target.value}
                );
                break;
            case "food":
                this.setState(
                    {storeCategory: event.target.value}
                );
                break;
            case "shopping":
                this.setState(
                    {storeCategory: event.target.value}
                );
                break;
            case "hobby":
                this.setState(
                    {storeCategory: event.target.value}
                );
                break;
            case "entertainment":
                this.setState(
                    {storeCategory: event.target.value}
                );
                break;    
        }
    }

    handleSubmit(event){
        event.preventDefault();
    }

    render(){
        return (
            <div>
                <h5 className="center">Pick your favorite 3 stores</h5>
                 <form onSubmit={this.handleSubmit}>
                    <label>
                        Pick a Category:
                        <select name ="storeCategory" value={this.state.storeCategory} onChange={this.handleChange.bind(this)}>
                            <option value="all">All</option>
                            <option value="food">Food</option>
                            <option value="shopping">Shopping</option>
                            <option value="hobby">Hobby</option>
                            <option value="entertainment">Entertainment</option>
                        </select>
                    </label>
                </form>
                <div className = "storePillBox">
                        <div className="btn">Whole Foods</div>
                        <div className="btn">Target</div>
                        <div className="btn">Walmart</div>
                        <div className="btn">PizzaHut</div>
                        <div className="btn">Taco Bell</div>
                        <div className="btn">Sam's Club</div>
                        <div className="btn">AAA</div>
                        <div className="btn">Best Buys</div>
                </div>
                <div>
                    <h5>Your picks:</h5>
                    <div>
                        <div className="btn">In & Out</div>
                        <div className="btn">Blockbuster</div>
                    </div>
                </div>
                <Link to="/activities" className="btn green darken-1">NEXT</Link>
            </div>
        )        
    }
}

export default Stores;