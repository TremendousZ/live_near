import React, { Component } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import { state, activity } from '../actions';
import { connect } from 'react-redux';

class Home extends Component{

    constructor(props){
        super(props);

        this.state = {
            state: "CA",
            activity: "crossfit"
        }
    }

    handleChange(event){
        switch(event.target.name){
            case "state":
                this.setState({
                    state: event.target.value
                })
            break;
        }

        switch(event.target.value){
            case "crossfit":
                this.setState({
                    activity: event.target.value
                });
                break;
            case "hiking":
                this.setState({
                    activity: event.target.value
                });
            break;
            case "swimming":
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
        this.props.activity(activity);
        this.props.state(state);
    }



    render(){
        console.log("this state",this.state);
        let {state, activity} = this.state;
        let stateLowerCase = state.toLowerCase().split(' ').join('');
        let activityLowerCase = activity.toLowerCase().split(' ').join('');
        let linkQuery = '/answer' +'/'+ activityLowerCase + '/' + stateLowerCase;
        return (
            <div>
                <div className="background-logo">
                    <h1 className="center">Live near</h1>
                </div>
                <p>The purpose of this app is to allow you to find nice places to live centered around
                    the grocery chain, Whole Foods, and your favorite activity. 
                </p>
                <form onSubmit = {this.handleSubmit.bind(this)}>
                    
                    <label>Please enter a State</label>
                    <input type="text" ref="state" placeholder ="State" name="state" onChange={this.handleChange.bind(this)} />
                    <select value={this.state.activity} ref = "activity" onChange={this.handleChange.bind(this)}>
                        <option value="crossfit">CrossFit</option>
                        <option value="hiking">Hiking</option>
                        <option value="swimming">Swimming</option>
                    </select>
                        <Link to={linkQuery} className="btn green darken-2">Submit</Link>
                </form>  
            </div>   
        );
    }  
}

function mapStateToProps(state){
    return {
        state: state.home.state,
        activity: state.home.activity
    }
}

export default connect(mapStateToProps,{ 
    state,
    activity
    })(Home);