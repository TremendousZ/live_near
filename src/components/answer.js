import React, {Component} from 'react';

class Answer extends Component{
    render(){
        return (
            <div className = "container">
                <ul className = "cityList">
                    <li>city name1 <span>Score: 9.2</span></li>
                    <li>city name2 <span>Score: 8.2</span></li>
                    <li>city name3 <span>Score: 7.2</span></li>
                    <li>city name4 <span>Score: 5.2</span></li>
                    <li>city name5 <span>Score: 4.2</span></li>
                    <li>city name6 <span>Score: 3.2</span></li>
                    <li>city name7 <span>Score: 2.2</span></li>
                </ul>
                <div className = "mapView">Map</div>

                <div className = "statsBox">
                    <div className = "favoriteStoreList">
                        <div>
                            <p>Store Name <span>True</span></p>
                            <div>Store Info</div> 
                        </div>
                        <div>
                            <p>Store Name <span>True</span></p>
                            <div>Store Info</div>  
                        </div>
                        <div>
                            <p>Store Name <span>False</span></p>
                            <div>No Store here</div>  
                        </div>
                        <div>
                            <p>Store Name <span>True or False</span></p>
                            <div>No Store here</div>  
                        </div>
                    </div>
                    <div className = "favoriteActivityList">
                        <div>
                            <p>Activity<span>True or False</span></p>
                            <div>Location for activity</div> 
                        </div>
                        <div>
                            <p>Activity<span>True or False</span></p>
                            <div>Location for activity</div> 
                        </div>
                        <div>
                            <p>Activity<span>True or False</span></p>
                            <div>Location for activity</div> 
                        </div>
                        <div>
                            <p>Activity<span>True or False</span></p>
                            <div>Location for activity</div> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }   
}

export default Answer;
