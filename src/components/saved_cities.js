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
            console.log(" DB Values", snapshot.val());
            let that = this;
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                console.log("CHILD DATA", childData);
                let temp = <Card  key = {that.mathRand()} details = {childData.cityCard.name} activityHits={childData.cityCard.activityHits} stateName={childData.cityCard.state} childData = "true" />;
                that.cardContainer.push(temp);
            })
            
    });
    this.setState({
        cardContainer: this.cardContainer,
    })  
}

    render(){
        console.log(" THIS !!!!! cardContainer",this.state.cardContainer);
        return(
            <div>
                <Link to="/saved_cities" className ="btn">Refresh Saved Cities</Link>
                <div>Your Saved Cities</div>
                <div>{this.state.cardContainer}</div>
            </div>
        )
    }

}



export default SavedCities;