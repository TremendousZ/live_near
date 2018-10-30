import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import "./store_card.css";

class StoreCard extends Component{
    constructor(props){
        super(props);

        this.state= {
            store_image_src:''
        }
    }

    componentDidMount(){
        this.requestPhoto(this.props.details.photos[0].photo_reference);
    }

    async requestPhoto(photoRef){
        let cityPhotoReferenceURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference="+photoRef+"&key=AIzaSyD-NNZfs0n53D0caUB0M_ERLC2n9psGZfc"
        const resp = await axios.post(cityPhotoReferenceURL);
        this.setState({
            store_image_src: resp.request.responseURL
        })
    }
    handleClick(event){
        event.preventDefault();
        console.log(event);
    }

    priceRating( priceNumber ){
        let price;
        switch(priceNumber){
            case 0:
            price = "";
            break;
            case 1:
            price = "$";
            break;
            case 2:
            price = "$$";
            break;
            case 3:
            price = "$$$";
            break;
            case 4:
            price = "$$$$";
            break;
        }   
        return price;
    }

    ratingLevel( ratingNumber){
        let rating = ratingNumber + " / 5 Stars"; 
        return rating;
    }

    render(){
        let linkQuery = this.props.match.url + '/' +this.props.details.geometry.location.lat + '/' + this.props.details.geometry.location.lng;
        return(
        <div className = "card mainContainer hoverable">
            <div className = "leftColumn">
                <div className ="storeNameTitle">{this.props.details.name}</div>
                <div>{this.props.details.formatted_address}</div>
                <div>Price: {this.priceRating(this.props.details.price_level)}</div>
                <div>Rating: {this.ratingLevel(this.props.details.rating)}</div>
                
                <Link className ="btn selectButton" to={linkQuery}>Select This Store</Link>   
            </div>
            <div className = "rightColumn">
                <div className = "imageContainer">
                    <img src ={this.state.store_image_src} />
                </div>    
            </div>
        </div>
        )
    }
}

export default StoreCard;
