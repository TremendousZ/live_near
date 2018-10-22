import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Route } from 'react-router-dom';
import Nav from './nav';
import Home from './home';
import Answer from './answer';


const App = () => (
    <div>
        <Nav />
        <div className = "container">
            <Route exact path = "/" component = {Home} />
            <Route path = "/answer/:activity/:state" component = {Answer} />
        </div>
    </div>

);

export default App;
