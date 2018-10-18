import React, {Component} from 'react';
import axios from 'axios';
import Card from './card';

class Answer extends Component{
    constructor(props){
        super(props);

        this.state = {
            topThree: [],
            state: this.props.match.params.state,
            activity: this.props.match.params.activity ,
            cardContainer:'',
        }
        this.cardContainer = [];
    }

    componentDidMount(){
        const { state , activity } = this.props.match.params;
        console.log("params state", state);
        console.log("activity state", activity);
        this.getWholeFoodsLocation(state, activity);
    }

    async getWholeFoodsLocation(stateName, activityName){
        
        console.log("STATE NAME     :",stateName);
        let stateSearchURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Whole%20Foods%20"+stateName+"&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyD-NNZfs0n53D0caUB0M_ERLC2n9psGZfc";
        
        const resp = await axios.post(stateSearchURL);
        console.log("WF Response     :",resp);
        this.getActivityLocations(resp,activityName)
    }

    async getActivityLocations(respWF,activityName){
        console.log("next function",respWF);
        let { lat, lng } = respWF.data.candidates[0].geometry.location;
        let type;
            // switch(activityName){
            //     case "crossfit":
            //         type = "gym";
            //     break;
            //     case "hiking":
            //         type = "campground";
            //     break;

            // }
            const resp = await axios.post("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+lng+"&radius=15000&type="+type+"&keyword=" + activityName + "&key=AIzaSyD-NNZfs0n53D0caUB0M_ERLC2n9psGZfc");
            console.log("Activity Response!:" , resp);
            this.storeCityNames(resp);

    }
    
    storeCityNames(respAL){
        let activityLocations = [];
        let activityLocationList = respAL.data.results;
        console.log("ACTIVITY LOCATION LIST     :",activityLocationList);
        debugger;
        for (let index = 0; index < activityLocationList.length; index++){
            let cityPlusCode;
            if(activityLocationList[index].plus_code === undefined){
                cityPlusCode = activityLocationList[index].vicinity;
                let cityName = cityPlusCode.split(' ');
                activityLocations.push(cityName[cityName.length-1])
            } else {
                cityPlusCode = activityLocationList[index].plus_code.compound_code;
                let cityName = cityPlusCode.split(' ');
                let cityMultipleWords;
                switch( cityName.length){
                    case 3:
                        activityLocations.push(cityName[1]);
                    break;
                    case 4:
                        cityMultipleWords = cityName[1] + " " + cityName[2];
                        activityLocations.push(cityMultipleWords);
                    break;
                    case 5:
                        cityMultipleWords = cityName[1] + " " + cityName[2] + " " + cityName[3];
                        activityLocations.push(cityMultipleWords);
                    break;
                }
                
            }
        }
        this.rankCityByActivityFrequency(activityLocations);
    }

    rankCityByActivityFrequency(array){
        console.log("CHECK ARRAY", array);
        let cityFrequency = {};
        for ( var index = 0; index < array.length; index ++){
            let cityName = array[index];
            if(cityName[cityName.length-1]===","){
                cityName = cityName.split('');
                cityName.pop();
                cityName = cityName.join('');
            }
            if(cityFrequency[cityName] == null){
                cityFrequency[cityName] = 1;
            } else {
                cityFrequency[cityName]++;
            }
            

        }
        let topThree = Object.keys(cityFrequency);
        this.setState({
            topThree
        });
        this.topThreeCities(topThree);
        console.log("City Frequency", cityFrequency);
    }

    mathRand(){
    	return Math.floor(Math.random()*10000)
    }

    topThreeCities(array){
        
        for(var index = 0; index < 3; index++){
            let temp = <Card key = {this.mathRand()+'o'+index} details = {array[index]} {...this.props} />
            this.cardContainer.push(temp);
        }
        this.setState({
            cardContainer: this.cardContainer,
        })
        // this.weatherCheck(city1,city2,city3,state);
        // this.getCityInfo(city1,city2,city3,state);

    }

    

    render(){
        return (
            <div className = "container">
                <ul className = "cityList">
                    <li>{this.state.topThree[0]}</li>
                    <li>{this.state.topThree[1]}</li>
                    <li>{this.state.topThree[2]}</li>
                    
                </ul>
                <div className = "mapView">Map</div>

                <div className = "statsBox">
                    <div className = "favoriteStoreList">
                        <div>
                            {this.state.cardContainer}
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
