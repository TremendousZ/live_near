import React, { Component } from 'react';

class Activities extends Component{  
    render(){
        return(
            <div>
                <h1 className="center">Please Enter Your Favorite Activites or Select a few of the provided activities</h1>
                <form>
                    <label>Activity Name:</label>
                    <input/>
                </form>
                <div className = "pillbox">
                    
                </div>
            </div>       
        )
    }
}

export default Activities;