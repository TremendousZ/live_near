import React, {Component} from 'react';
import { db } from "../firebase";
import Card from './card';
import "./card.css";
import {Link} from 'react-router-dom';

class SavedCities extends Component{
    constructor(props){
        super(props);
        
        this.state= {
            cardContainer:[],
        }
        this.cardContainer = [];
    }
    
    mathRand(){
        return Math.floor(Math.random()*10000)
    }

    componentDidMount(){
        this.dbRef = db.ref("/cities");
        this.dbRef.once('value').then((snapshot)=>{
            let that = this;
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                let temp = <Card  key = {that.mathRand()} details = {childData.cityCard.name} activityHits={childData.cityCard.activityHits} stateName={childData.cityCard.state} childData = "true" />;
                that.cardContainer.push(temp);
            })
            
    });
    this.setState({
        cardContainer: this.cardContainer,
    })  
}

    render(){
        return(
            <div>
                <Link to="/saved_cities" className ="btn loadButton">Load Saved Cities</Link>
                <div>{this.state.cardContainer}</div>
            </div>
        )
    }

}



export default SavedCities;