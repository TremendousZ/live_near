import React, {Component} from 'react';

class Stores extends Component{



    render(){
        return (
            <div>
                <h5 className="center">Pick your favorite 3 stores</h5>
                 <form onSubmit={this.handleSubmit}>
                    <label>
                        Minimum Amount:
                        <select name ="minimum">
                            <option value="200">$200,000</option>
                            <option value="400">$400,000</option>
                            <option value="600">$600,000</option>
                            <option value="800">$800,000</option>
                            <option value="1000">$1,000,000</option>
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
                <div className="btn green darken-1">NEXT</div>
            </div>
        )        
    }
}

export default Stores;