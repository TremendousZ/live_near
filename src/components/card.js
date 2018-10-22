import React,{Component} from 'react';

class Card extends Component{
    constructor(props){
        super(props);
    }


    render(){
        console.log("Check these Props",this.props);
        const {details} = this.props.details;
        const {activityHits} = this.props.activityHits;
        let stateNameArray = this.props.stateName.split('');
        console.log("State Name Array",stateNameArray);
        stateNameArray[0].toUpperCase();
        console.log(stateNameArray);
        let properStateName = stateNameArray.join('');
        console.log("here", properStateName);
        let wikipediaURL = "https://en.wikipedia.org/wiki/"+this.props.details+"%2C_"+properStateName;
        return (
            <div className = "card">
                <p>{details}</p>
                <a target="_blank" href={wikipediaURL}>learn more...</a>
                <div>
                    Number of Activity Hits : {activityHits}
                        <ul> 
                            <li>Store name / Info</li>
                        </ul>
                </div>
                <div>
                    Distance from Whole Foods: <span>XX miles</span>
                </div>
                <a>Get Housing Data</a>
                <div>
                    Current Weather:
                </div>
                <div>
                    Forecast:
                </div>
                <div>
                    Air Pollution Rating: 
                </div>
                <button>Save City</button>
            </div>
        )
    }
}

export default Card;