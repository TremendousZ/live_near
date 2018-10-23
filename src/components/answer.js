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
            numberOfActivityMatches: [],
        }
        this.cardContainer = [];
    }

    componentDidMount(){
        const { state , activity } = this.props.match.params;
        this.getWholeFoodsLocation(state, activity);
    }

    async getWholeFoodsLocation(stateName, activityName){
        let stateSearchURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Whole%20Foods%20"+stateName+"&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyD-NNZfs0n53D0caUB0M_ERLC2n9psGZfc";
        
        const resp = await axios.post(stateSearchURL);
        this.getActivityLocations(resp,activityName)
    }

    async getActivityLocations(respWF,activityName){
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
            
            this.storeCityNames(resp);

    }
    
    storeCityNames(respAL){
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
        
        for(var index = 0; index < 3; index++){
            let temp = <Card key = {this.mathRand()+'o'+index} details = {array[index]} activityHits={this.state.numberOfActivityMatches[index]} stateName={this.state.state} {...this.props} />
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
                </div>
            </div>
        )
    }   
}

export default Answer;
