import React, { Component } from 'react';

class Activities extends Component{  
  
    render(){
        return (
            <div>
                <h5 className="center">Pick your favorite 3 hobbies</h5>
                <input placeholder="Select a category"/>
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
                <div className="btn green darken-1">NEXT</div>
            </div>
        )        
    }
}

export default Activities;