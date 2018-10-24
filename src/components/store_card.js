import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

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
        let cityPhotoReferenceURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+photoRef+"&key=AIzaSyD-NNZfs0n53D0caUB0M_ERLC2n9psGZfc"
        const resp = await axios.post(cityPhotoReferenceURL);
        console.log("FIND PHOTO IN HERE",resp);
        this.setState({
            store_image_src: resp.request.responseURL
        })
    }
    handleClick(event){
        event.preventDefault();
        console.log(event);
    }

    render(){
        let linkQuery = this.props.match.url + '/' +this.props.details.geometry.location.lat + '/' + this.props.details.geometry.location.lng;
        console.log("Check the Store Card Props",this.props);
        return(
        <div className = "card mainContainer">
            <div className = "leftColumn">
                <div>{this.props.details.name}</div>
                <div>Store Address: {this.props.details.formatted_address}</div>
                <Link className ="btn" to={linkQuery}>Select This Store</Link>   
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
