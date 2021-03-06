import React, { Component } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import { state, activity } from '../actions';
import { connect } from 'react-redux';

class Home extends Component{

    constructor(props){
        super(props);

        this.state = {
            state: "Alabama",
            activity: "Crossfit",
            store: "Whole_Foods"
        }
    }

    componentDidMount(){
        this.checkLocalStorageForUserId();
    }

    checkLocalStorageForUserId(){
        let userId = localStorage.getItem("userId");
        if(userId == null){
            let newUserId = this.generateUserId();
            localStorage.setItem("userId", newUserId);
        }
    }

    generateUserId(){
        let userIdNumber = Math.random() * 100;
        return userIdNumber;
        }

    handleChange(event){
        switch(event.target.name){
            case "store":
                this.setState({
                    store: event.target.value
                });
                break;
            case "state":
                this.setState({
                    state:event.target.value
                })
        }

        switch(event.target.value){
            case "Crossfit":
                this.setState({
                    activity: event.target.value
                });
                break;
            case "Hiking":
                this.setState({
                    activity: event.target.value
                });
            break;
            case "Swimming":
                this.setState({
                    activity: event.target.value
                });
            break;
           
        }
    }

    handleSubmit(event){
        event.preventDefault();
        const state = this.refs.state.value;
        const activity = this.refs.activity.value;
        const store = this.refs.store.value;
        this.props.activity(activity);
        this.props.state(state);
        this.props.store(store);
    }



    render(){
        let {state, activity, store} = this.state;
        let linkQuery = '/' + store +'/'+ activity + '/' + state;
        return (
            <div className = "homeContainer">
                <div className="background-logo">
                    <div className="center title">Live near</div>
                </div>
                <p>The original purpose of this app is to allow you to find nice places to live centered around
                    the grocery chain, Whole Foods, and your favorite activity. I have since added Walmart and Target to add some variety to the store selection. Please feel free to recommend your favorite stores! To get started, Please select a state and an activity, then <b>click the Start Your Search button.</b>
                </p>
                <form onSubmit = {this.handleSubmit.bind(this)}>
                    <label className = "storeSelectLabel">Please select a store</label>
                    <select value={this.state.store} className = "storeSelectInput" ref = "store" name="store" onChange={this.handleChange.bind(this)}>
                        <option value = "Whole_Foods">Whole Foods</option>
                        <option value = "Target">Target</option>
                        <option value = "Walmart">Walmart</option>
                    </select>
                    <label className = 'stateSelectLabel'>Please enter a State</label>
                    <select value={this.state.state} className = "stateSelectInput" ref = "state" name="state" onChange={this.handleChange.bind(this)}>
                        <option value="Alabama">Alabama</option>
                        <option value="Alaska">Alaska</option>
                        <option value="Arizona">Arizona</option>
                        <option value="Arkansas">Arkansas</option>
                        <option value="California">California</option>
                        <option value="Colorado">Colorado</option>
                        <option value="Connecticut">Connecticut</option>
                        <option value="Delaware">Delaware</option>
                        <option value="Florida">Florida</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Hawaii">Hawaii</option>
                        <option value="Idaho">Idaho</option>
                        <option value="Illinous">Illinous</option>
                        <option value="Indiana">Indiana</option>
                        <option value="Iowa">Iowa</option>
                        <option value="Kansas">Kansas</option>
                        <option value="Kentucky">Kentucky</option>
                        <option value="Louisiana">Louisiana</option>
                        <option value="Maine">Maine</option>
                        <option value="Maryland">Maryland</option>
                        <option value="Massachucetts">Massachucetts</option>
                        <option value="Michigan">Michigan</option>
                        <option value="Minnesota">Minnesota</option>
                        <option value="Mississippi">Mississippi</option>
                        <option value="Missouri">Missouri</option>
                        <option value="Montana">Montana</option>
                        <option value="Nebraska">Nebraska</option>
                        <option value="Nevada">Nevada</option>
                        <option value="New_Hampshire">New Hampshire</option>
                        <option value="New_Jersey">New Jersey</option>
                        <option value="New_Mexico">New Mexico</option>
                        <option value="New_York">New York</option>
                        <option value="North_Carolina">North Carolina</option>
                        <option value="North_Dakota">North Dakota</option>
                        <option value="Ohio">Ohio</option>
                        <option value="Oklahoma">Oklahoma</option>
                        <option value="Oregon">Oregon</option>
                        <option value="Pennsylvania">Pennsylvania</option>
                        <option value="Rhode_Island">Rhose Island</option>
                        <option value="South_Carolina">South Carolina</option>
                        <option value="South_Dakota">South Dakota</option>
                        <option value="Tennessee">Tennessee</option>
                        <option value="Texas">Texas</option>
                        <option value="Utah">Utah</option>
                        <option value="Vermont">Vermont</option>
                        <option value="Virginia">Virginia</option>
                        <option value="Washington">Washington</option>
                        <option value="West_Virginia">West Virginia</option>
                        <option value="Wisconsin">Wisconsin</option>
                        <option value="Wyoming">Wyoming</option>
                    </select>
                    <label className = "activitySelectLabel">Please select an activity to search</label>
                    <select value={this.state.activity} ref = "activity" className ="activityNameInput" onChange={this.handleChange.bind(this)}>
                        <option value="Crossfit">CrossFit</option>
                        <option value="Hiking">Hiking</option>
                        <option value="Swimming">Swimming</option>
                    </select>
                        <Link to={linkQuery} className="submitButton btn green darken-2">Start Your Search!</Link>
                </form>  
            </div>   
        );
    }  
}

function mapStateToProps(state){
    console.log("THIS REDUX STATE ", state);
    return {
        state: state.home.state,
        activity: state.home.activity
    }
}

export default connect(mapStateToProps,{ 
    state,
    activity
    })(Home);