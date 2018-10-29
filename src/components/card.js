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
            cityWeather: '',
            image_src:'',
            userId:"",
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

    async getCurrentWeather(cityName){
        let lat = this.props.match.params.lat;
        let lng = this.props.match.params.lng;
        let openWeatherAPI = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&APPID=7467f23f7a5df9a5d65456efecc92ebf&units=imperial";
        const resp = await axios.post(openWeatherAPI);
        this.setState({
            cityTemp: resp.data.main.temp,
            cityWeather: resp.data.weather[0].main
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

    // handleClick(){
        
    //     this.dbRef.on('value',(snapshot)=>{
    //         console.log(" DB Values", snapshot.val());
    //     });
    
    // }
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
                    
                    <div>
                        Number of Activity Hits : {this.props.activityHits}
                    </div>
                    <div>
                        Distance from Whole Foods: <span>XX miles</span>
                    </div>
                    <a target="_blank" href={zillowURL}>See houses in {this.props.details}</a>
                    <div>
                        Current Temperature: {this.state.cityTemp}&deg;F
                        <div>
                        Current Weather: {this.state.cityWeather}
                        </div>
                    </div>
                    <button className ="btn saveButton" onClick={this.saveCity.bind(this)}>Save City</button>   
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