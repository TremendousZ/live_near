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
            cardContainer:'',
            numberOfActivityMatches: [],
        }
        this.cardContainer = [];
    }

    componentDidMount(){
        this.getActivityLocations();
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
        //Make an empty array to store wnted information
        let activityLocations = [];
        //Save array of matching activity objects
        let activityLocationList = respAL.data.results;
        //Loop through the list
        for (let index = 0; index < activityLocationList.length; index++){
            let cityPlusCode, storeName;
            storeName = activityLocationList[index].name;
            if(activityLocationList[index].plus_code === undefined){
                cityPlusCode = activityLocationList[index].vicinity;
                let cityName = cityPlusCode.split(' ');
                activityLocations.push({
                    cityName:cityName[cityName.length-1],
                    storeName
                })
            } else {
                cityPlusCode = activityLocationList[index].plus_code.compound_code;
                let cityName = cityPlusCode.split(' ');
                let cityMultipleWords;
                switch( cityName.length){
                    case 3:
                        activityLocations.push({
                            cityName:cityName[1],
                            storeName
                        }
                            );
                    break;
                    case 4:
                        cityMultipleWords = cityName[1] + " " + cityName[2];
                        activityLocations.push({
                            cityName:cityMultipleWords,
                            storeName
                        });
                    break;
                    case 5:
                        cityMultipleWords = cityName[1] + " " + cityName[2] + " " + cityName[3];
                        activityLocations.push({
                            cityName:cityMultipleWords,
                            storeName
                        });
                    break;
                }
                
            }
        }
        this.rankCityByActivityFrequency(activityLocations);
    }

    rankCityByActivityFrequency(array){
        console.log("New array of objects", array);
        let cityFrequency = {};
        let storeList = [];
        for ( var index = 0; index < array.length; index ++){
            let cityName = array[index].cityName;
            let storeName = array[index].storeName;
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

            storeList.push({cityName,storeName});
        
        }
        let topThree = Object.keys(cityFrequency);
        let activityHits = Object.values(cityFrequency);
        this.setState({
            topThree,
            numberOfActivityMatches: activityHits
        });
        this.topThreeCities(topThree,storeList);
    }

    mathRand(){
    	return Math.floor(Math.random()*10000)
    }

    topThreeCities(cityArray, storeArray){
        console.log("Check this store array",storeArray);

        for(var index = 0; index < cityArray.length; index++){
            let cityStoreList = [];
            for(let storeIndex = 0; storeIndex < storeArray.length; storeIndex++){
                if(cityArray[index] === storeArray[storeIndex].cityName){
                    cityStoreList.push(storeArray[storeIndex].storeName);
                }
            }
            let temp = <Card key = {this.mathRand()+'o'+index} details = {cityArray[index]} activityHits={this.state.numberOfActivityMatches[index]} stateName={this.state.state}  storeList = {cityStoreList} {...this.props} />
            this.cardContainer.push(temp);
        }
        this.setState({
            cardContainer: this.cardContainer,
        })

    }

    

    render(){
        console.log("WORKING CARD CONTAINER ", this.state.cardContainer);
        return (
            <div>
                <div className = "statsBox">
                    <div className = "cityCardList">
                        <div>
                            {this.state.cardContainer}
                        </div>
                    </div>
                    <Link to='/saved-cities' className = 'btn'>See Your Saved Cities</Link>
                </div>
            </div>
        )
    }   
}

export default Answer;
