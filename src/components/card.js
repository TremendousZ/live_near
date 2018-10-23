import React,{Component} from 'react';
import axios from 'axios';
import "./card.css";

class Card extends Component{
    constructor(props){
        super(props);
        this.state = {
            cityTemp: '',
            cityWeather: '',
            image_src:''
        }
        
    }
    componentDidMount(){
        this.getCurrentWeather(this.props.details);
        this.getCityPhotoReference(this.props.details,this.props.stateName)
        
    }

    async getCurrentWeather(cityName){
        let openWeatherAPI = "http://api.openweathermap.org/data/2.5/weather?q="+this.props.details +",us&APPID=7467f23f7a5df9a5d65456efecc92ebf&units=imperial";
        const resp = await axios.post(openWeatherAPI);
        console.log("Weather Response",resp);
        this.setState({
            cityTemp: resp.data.main.temp,
            cityWeather: resp.data.weather[0].main
        })
    }
    async getCityPhotoReference(cityName,stateName){
        console.log("STATE NAME     :",stateName);
        let cityStateSearchURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input="+cityName+"%20"+stateName+"&inputtype=textquery&fields=photos&key=AIzaSyD-NNZfs0n53D0caUB0M_ERLC2n9psGZfc";
        
        const resp = await axios.post(cityStateSearchURL);
        console.log("CITY PHOTO???     :",resp);
        console.log("photo ref string", resp.data.candidates[0].photos[0].photo_reference);
        return this.requestPhoto(resp.data.candidates[0].photos[0].photo_reference);
    }

    async requestPhoto(photoRef){
        let cityPhotoReferenceURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+photoRef+"&key=AIzaSyD-NNZfs0n53D0caUB0M_ERLC2n9psGZfc"
        const resp = await axios.post(cityPhotoReferenceURL);
        console.log("FIND PHOTO IN HERE",resp);
        this.setState({
            image_src: resp.request.responseURL
        })
    }
    render(){
        console.log("Check these Props",this.props);
        let zillowURL = "https://www.zillow.com/homes/for_sale/"+this.props.details+"-"+this.props.stateName+"_rb/"
        let wikipediaURL = "https://en.wikipedia.org/wiki/"+this.props.details+"%2C_"+this.props.stateName;
        return (
            <div className = "card mainContainer">
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
                    <button className ="btn">Save City</button>   
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