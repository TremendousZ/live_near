import React, { Component } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

class Home extends Component{

    constructor(props){
        super(props);

        this.state = {
            zipcode: null,
            state: null
        }
    }

    handleChange(event){
        debugger;
        switch(event.target.name){
            case "zipcode":
                this.setState({
                    zipcode: event.target.value
                });
                break;
            case "state":
                this.setState({
                    state: event.target.value
                })
        }
    }

    handleSubmit(event){
        event.preventDefault();
    }



    render(){
        return (
            <div>
                <div className="background-logo">
                    <h1 className="center">Live near</h1>
                </div>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                     Tenetur libero commodi harum at eius dolorum esse iure 
                     perferendis excepturi, aperiam non possimus provident 
                     debitis vel hic facere vero perspiciatis fuga quas distinctio 
                     quibusdam mollitia. A deserunt, vitae quidem cumque placeat 
                     quaerat laborum aperiam provident atque.</p>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>Please enter a Zipcode</label>
                    <input type = "text" name = "zipcode" placeholder="Zipcode" onChange={this.handleChange.bind(this)} />
                    <label>Please enter a State</label>
                    <input type="text" name = "state" placeholder ="State" onChange={this.handleChange.bind(this)} />
                    <Link to="/stores" className  = "btn green darken-2">Submit</Link>
                </form>
                
                <p>You search will not be saved until you login</p>   
            </div>   
        );
    }  
}
export default Home;