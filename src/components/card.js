import React,{Component} from 'react';
import axios from 'axios';
import "./card.css";
import { db } from "../firebase";



class Card extends Component{
    dbRef = db.ref('/cities');
    constructor(props){
        super(props);
        this.state = {
            cityTemp: '',
            stateAbbr: "",
            cityWeather: '',
            weatherIcon:"",
            image_src:'',
            userId:"",
            cityDescription:"",
            cityCard: {
                name:"",
                state:"",
                temp:"",
                weather:"",
                activityHits:"",
                activityName:"",
            }
        }
        
    }
    componentDidMount(){
        this.getCurrentWeather(this.props.details);
        this.getCityPhotoReference(this.props.details,this.props.stateName);
        this.getCityData();
        if(!this.props.childData){
            this.setState({
                cityCard: {
                    name: this.props.details,
                    state: this.props.stateName,
                    temp: this.state.cityTemp,
                    weather: this.state.cityWeather,
                    activityHits: this.props.activityHits,
                    activity: this.props.match.params.activity
            }
        })
    } else {
        this.setState({
            cityCard: {
                name: this.props.details,
                state: this.props.stateName,
                temp: this.state.cityTemp,
                weather: this.state.cityWeather,
                activityHits: this.props.activityHits,
                
        }
    })
    }
}

    async getCityData(){
        let cityDataURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles="+this.props.details+"%2C_"+this.props.stateName;
        const resp = await axios.get(cityDataURL);
        this.populateCityInfo(resp);
    }

    populateCityInfo(response){
        let cityDescriptionPage = Object.keys(response.data.query.pages);
        let cityPageNumber = parseFloat(cityDescriptionPage[0]);
        if(cityDescriptionPage == "-1"){
            this.setState({
                cityDescription: "No information provided"
            })
        } else {
            let cityExtract = response.data.query.pages[cityPageNumber].extract;
            this.setState({
                cityDescription: cityExtract
            })
        }
    }

    async getCurrentWeather(cityName){
        let lat = this.props.match.params.lat;
        let lng = this.props.match.params.lng;
        let openWeatherAPI = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&APPID=7467f23f7a5df9a5d65456efecc92ebf&units=imperial";
        const resp = await axios.post(openWeatherAPI);
        let weatherIcon = resp.data.weather[0].icon;
        let iconSrc = "http://openweathermap.org/img/w/"+weatherIcon+".png";
        this.setState({
            cityTemp: resp.data.main.temp,
            cityWeather: resp.data.weather[0].main,
            weatherIcon: iconSrc
        })
    }
    async getCityPhotoReference(cityName,stateName){
        let cityStateSearchURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input="+cityName+"%20"+stateName+"&inputtype=textquery&fields=photos&key=AIzaSyD-NNZfs0n53D0caUB0M_ERLC2n9psGZfc";
        
        const resp = await axios.post(cityStateSearchURL);
        if(resp.data.candidates[0] == undefined){
            return this.requestPhoto("No Photo");
        };
        return this.requestPhoto(resp.data.candidates[0].photos[0].photo_reference);
    }

    async requestPhoto(photoRef){
        if(photoRef == "No Photo"){
            return;
        }
        let cityPhotoReferenceURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+photoRef+"&key=AIzaSyD-NNZfs0n53D0caUB0M_ERLC2n9psGZfc"
        const resp = await axios.post(cityPhotoReferenceURL);
        this.setState({
            image_src: resp.request.responseURL
        })
    }

    saveCity = async () =>{
        const newCity= {
                    cityCard: this.state.cityCard
                }   
        await this.dbRef.push(newCity);
    }

    componentWillUnmount(){
        this.dbRef.off();
    }
    render(){
        let zillowURL = "https://www.zillow.com/homes/for_sale/"+this.props.details+"-"+this.props.stateName+"_rb/"
        let wikipediaURL = "https://en.wikipedia.org/wiki/"+this.props.details+"%2C_"+this.props.stateName;
        return (
            <div className = "card mainContainer hoverable">
                <div className = "leftColumn">
                    <p>{this.props.details} <a target="_blank" href={wikipediaURL}>learn more...</a></p>
                        <div className = "weather">
                            <div>{this.state.cityTemp}&deg;F</div> 
                            <img src={this.state.weatherIcon} />
                        </div>
                        
                    <div className = "activityMatches">
                        {this.props.activityName} Matches : {this.props.activityHits} Names: {this.props.storeList.join(", ")}
                    </div>
                    <div className = "cityWikipediaDescription">
                        {this.state.cityDescription}
                    </div>
                    
                    <button className ="btn saveButton" onClick={this.saveCity.bind(this)}>Save City</button>  
                    <a target="_blank" className = "housingLink" href={zillowURL}>See houses in {this.props.details}</a> 
                </div>
                <div className = "rightColumn">
                    <div className = "imageContainer">
                        <img src ={this.state.image_src} />
                    </div>
                    
                </div>
            </div>
        )
    }
}



export default Card;