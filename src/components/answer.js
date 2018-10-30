import React, {Component} from 'react';
import axios from 'axios';
import Card from './card';
import {Link} from "react-router-dom";
import SavedCities from "./saved_cities";

class Answer extends Component{
    constructor(props){
        super(props);

        this.state = {
            topThree: [],
            state: this.props.match.params.state,
            activity: this.props.match.params.activity,
            lat: this.props.match.params.lat,
            lng: this.props.match.params.lng,
            store: this.props.match.params.store,
            stateAbbr: "",
            cardContainer:'',
            numberOfActivityMatches: [],
        }
        this.cardContainer = [];
    }

    componentDidMount(){
        this.getActivityLocations();
        this.createStateAbbreviation(this.state.state);
    }

    createStateAbbreviation(stateName){
        switch (stateName.toUpperCase())
            {
                case "ALABAMA":
                    return this.setState({
                        stateAbbr:"AL",
                    })
                break;
                case "ALASKA":
                return this.setState({
                    stateAbbr:"AK",
                });
                break;
                
                case "ARIZONA":
                return this.setState({
                    stateAbbr:"AZ",
                })
                break;
                case "ARKANSAS":
                return this.setState({
                    stateAbbr:"AR",
                })
                break;
                case "CALIFORNIA":
                return this.setState({
                    stateAbbr:"CA",
                })
                break;
                case "COLORADO":
                return this.setState({
                    stateAbbr:"CO",
                })
                break;
                case "CONNECTICUT":
                return this.setState({
                    stateAbbr:"CT",
                })
                break;
                case "DELAWARE":
                return this.setState({
                    stateAbbr:"DE",
                })
                break;
                case "FLORIDA":
                return this.setState({
                    stateAbbr:"FL",
                })
                break;
                case "GEORGIA":
                return this.setState({
                    stateAbbr:"GA",
                })
                break;
                case "HAWAII":
                return this.setState({
                    stateAbbr:"HI",
                })
                break;
                case "IDAHO":
                return this.setState({
                    stateAbbr:"ID",
                })
                break;
                case "ILLINOIS":
                return this.setState({
                    stateAbbr:"IL",
                })
                break;
                case "INDIANA":
                return this.setState({
                    stateAbbr:"IN",
                })
                break;
                case "IOWA":
                return this.setState({
                    stateAbbr:"IA",
                })
                break;
                case "KANSAS":
                return this.setState({
                    stateAbbr:"KS",
                })
                break;
                case "KENTUCKY":
                return this.setState({
                    stateAbbr:"KY",
                })
                break;
                case "LOUISIANA":
                return this.setState({
                    stateAbbr:"LA",
                })
                break;
                case "MAINE":
                return this.setState({
                    stateAbbr:"ME",
                })
                break;
                case "MARYLAND":
                return this.setState({
                    stateAbbr:"MD",
                })
                break;
                case "MASSACHUSETTS":
                return this.setState({
                    stateAbbr:"MA",
                })
                break;
                case "MICHIGAN":
                return this.setState({
                    stateAbbr:"MI",
                })
                break;
                case "MINNESOTA":
                return this.setState({
                    stateAbbr:"MN",
                })
                break;
                case "MISSISSIPPI":
                return this.setState({
                    stateAbbr:"MS",
                })
                break;
                case "MISSOURI":
                return this.setState({
                    stateAbbr:"MO",
                })
                break;
                case "MONTANA":
                return this.setState({
                    stateAbbr:"MT",
                })
                break;
                case "NEBRASKA":
                return this.setState({
                    stateAbbr:"NE",
                })
                break;
                case "NEVADA":
                return this.setState({
                    stateAbbr:"NV",
                })
                break;
                case "NEW_HAMPSHIRE":
                return this.setState({
                    stateAbbr:"NH",
                })
                break;
                case "NEW_JERSEY":
                return this.setState({
                    stateAbbr:"NJ",
                })
                break;
                case "NEW_MEXICO":
                return this.setState({
                    stateAbbr:"NM",
                })
                break;
                case "NEW_YORK":
                return this.setState({
                    stateAbbr:"NY",
                })
                break;
                case "NORTH_CAROLINA":
                return this.setState({
                    stateAbbr:"NC",
                })
                break;
                case "NORTH_DAKOTA":
                return this.setState({
                    stateAbbr:"ND",
                })
                break;
                case "OHIO":
                return this.setState({
                    stateAbbr:"OH",
                })
                break;
                case "OKLAHOMA":
                return this.setState({
                    stateAbbr:"OK",
                })
                break;
                case "OREGON":
                return this.setState({
                    stateAbbr:"OR",
                })
                break;
                case "PENNSYLVANIA":
                return this.setState({
                    stateAbbr:"PA",
                })
                break;
                case "RHODE_ISLAND":
                return this.setState({
                    stateAbbr:"RI",
                })
                break;
                case "SOUTH_CAROLINA":
                return this.setState({
                    stateAbbr:"SC",
                })
                break;
                case "SOUTH_DAKOTA":
                return this.setState({
                    stateAbbr:"SD",
                })
                break;
                case "TENNESSEE":
                return this.setState({
                    stateAbbr:"TN",
                })
                break;
                case "TEXAS":
                return this.setState({
                    stateAbbr:"TX",
                })
                break;
                case "UTAH":
                return this.setState({
                    stateAbbr:"UT",
                })
                break;
                case "VERMONT":
                return this.setState({
                    stateAbbr:"VT",
                })
                break;
                case "VIRGINIA":
                return this.setState({
                    stateAbbr:"VA",
                })
                break;
                case "WASHINGTON":
                return this.setState({
                    stateAbbr:"WA",
                })
                break;
                case "WEST_VIRGINIA":
                return this.setState({
                    stateAbbr:"WV",
                })
                break;
                case "WISCONSIN":
                return this.setState({
                    stateAbbr:"WI",
                })
                break;
                case "WYOMING":
                return this.setState({
                    stateAbbr:"WY",
                })
                break;
            }

    }

    async getActivityLocations(){
        let lat = this.state.lat;
        let lng = this.state.lng;
        let type;
        let activityName = this.state.activity;
            const resp = await axios.post("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+lng+"&radius=15000&type="+type+"&keyword=" + activityName + "&key=AIzaSyD-NNZfs0n53D0caUB0M_ERLC2n9psGZfc");
            this.storeCityNames(resp);
    }

    
    storeCityNames(respAL){
        console.log("Find the store names here", respAL);
        let activityLocations = [];
        let activityLocationList = respAL.data.results;
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
        let activityHits = Object.values(cityFrequency);
        this.setState({
            topThree,
            numberOfActivityMatches: activityHits
        });
        this.topThreeCities(topThree);
    }

    mathRand(){
    	return Math.floor(Math.random()*10000)
    }

    topThreeCities(array){
        
        for(var index = 0; index < array.length; index++){
            let temp = <Card key = {this.mathRand()+'o'+index} details = {array[index]} activityHits={this.state.numberOfActivityMatches[index]} stateName={this.state.state} stateAbbr={this.state.stateAbbr} activityName = {this.state.activity} {...this.props} />
            this.cardContainer.push(temp);
        }
        this.setState({
            cardContainer: this.cardContainer,
        })

    }

    

    render(){
        return (
            <div>
                <div className = "statsBox">
                    <div className = "cityCardList">
                        <div>
                            {this.state.cardContainer}
                        </div>
                    </div>
                    <Link to='/saved-cities' className = 'btn goToSavedButton'>See Your Saved Cities</Link>
                </div>
            </div>
        )
    }   
}

export default Answer;
