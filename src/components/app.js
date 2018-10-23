import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Route } from 'react-router-dom';
import Nav from './nav';
import Home from './home';
import Answer from './answer';
import HouseImage from "../assets/images/breno-assis-517356-unsplash.jpg"


const App = () => (
    <div>
        <Nav />
        <div className = "backgroundContainer" style={{backgroundImage:`url(${HouseImage})`,height:'100vh',width: '100vw'}}>
            <div className = "container" style={{backgroundColor:'white', height:'100%'}}>
                <Route exact path = "/" component = {Home} />
                <Route path = "/answer/:activity/:state" component = {Answer} />
            </div>
        </div>
    </div>

);

export default App;
