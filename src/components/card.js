import React,{Component} from 'react';

class Card extends Component{
    constructor(props){
        super(props);
    }


    render(){
        console.log("Check these Props",this.props);
        return (
            <div className = "card">
                <p>City Name Goes Here</p>
            </div>
        )
    }
}

export default Card;