import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Route } from 'react-router-dom';
import Nav from './nav';
import Home from './home';
import HouseImage from "../assets/images/breno-assis-517356-unsplash_opt.jpg"
import ChooseStore from './choose_store';
import Answer from './answer';


const App = () => (
    <div>
        <Nav />
        <div className = "backgroundContainer" style={{backgroundImage:`url(${HouseImage})`,height:'100vh', width:'100vw'}}>
            <div className = "container" style={{height:'100%'}}>
                <Route exact path = "/" component = {Home} />
                <Route exact path = "/:store/:activity/:state" component = {ChooseStore} />
                <Route path = "/:store/:activity/:state/:lat/:lng" component = {Answer} />
            </div>
        </div>
    </div>

);

export default App;
