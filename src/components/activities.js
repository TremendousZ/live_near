import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Activities extends Component{  
    constructor(props){
        super(props);

        this.state = {
            activityType: "all"
        }
    }


    handleChange(event){
        switch(event.target.value){
            case "all":
                this.setState(
                    {activityType: event.target.value}
                );
                break;
            case "indoor":
                this.setState(
                    {activityType: event.target.value}
                );
                break;
            case "outdoor":
                this.setState(
                    {activityType: event.target.value}
                );
                break;
            case "sports":
                this.setState(
                    {activityType: event.target.value}
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
                <h5 className="center">Pick your favorite 3 hobbies</h5>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Pick a Category:
                        <select name ="storeCategory" value={this.state.storeCategory} onChange={this.handleChange.bind(this)}>
                            <option value="all">All</option>
                            <option value="indoor">Indoor</option>
                            <option value="outdoor">Outdoor</option>
                            <option value="sports">Sports</option>
                        </select>
                    </label>
                </form>
                <div className = "storePillBox">
                        <div className="btn">Swimming</div>
                        <div className="btn">Tennis</div>
                        <div className="btn">Baseball</div>
                        <div className="btn">Comics</div>
                        <div className="btn">Football</div>
                        <div className="btn">Climbing</div>
                        <div className="btn">Cycling</div>
                        <div className="btn">Sailing</div>
                </div>
                <div>
                    <h5>Your picks:</h5>
                    <div>
                        <div className="btn">Hiking</div>
                        <div className="btn">Camping</div>
                    </div>
                </div>
                <Link to="housing" className="btn green darken-1">NEXT</Link>
            </div>
        )        
    }
}

export default Activities;