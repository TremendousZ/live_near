import React, { Component } from 'react';
import './housing.css';

class Housing extends Component{
    constructor(props){
        super(props);
        this.state = {
            minimum: {
                value: "200"
            },
            maximum: {
                value: "400"
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        switch(event.target.name){
            case "minimum":
                this.setState({
                    minimum: {value: event.target.value}
                });
                break;
            case "maximum":
                this.setState({
                    maximum: {value: event.target.value}
                });
                break;
        }
    }

    handleSubmit(event){
        event.preventDefault();
    }

    render(){
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Minimum Amount:
                        <select name ="minimum" value={this.state.minimum.value} onChange={this.handleChange}>
                            <option value="200">$200,000</option>
                            <option value="400">$400,000</option>
                            <option value="600">$600,000</option>
                            <option value="800">$800,000</option>
                            <option value="1000">$1,000,000</option>
                        </select>
                    </label>
                    <label>
                        Maximum Amount:
                        <select name ="maximum" value={this.state.maximum.value} onChange={this.handleChange}>
                            <option value="400">$400,000</option>
                            <option value="600">$600,000</option>
                            <option value="800">$800,000</option>
                            <option value="1000">$1,000,000</option>
                            <option value="3000">$3,000,000</option>
                        </select>
                    </label>
                    <button className="btn green darken-2">Submit</button>
                </form>
            </div>
        );
    }
}

export default Housing;