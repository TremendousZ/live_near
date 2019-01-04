import React, {Component} from 'react';
import "./activity_slide_out.css";

class SlideOut extends Component {
    constructor(props){
        super(props);
    }

    render(){


        console.log("slide-out props", this.props);
        return (
            <div className = "slide-out">
                <div className = "matches-count">{this.props.matches} MATCHES</div>
                <div className = "matches-names">{this.props.names}</div>
            </div>
        )
    }
}

export default SlideOut;