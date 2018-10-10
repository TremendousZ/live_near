import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Route } from 'react-router-dom';
import Nav from './nav';
import Home from './home';
import About from './about';
import Editor from './editor';
import Textboards from './textboards';


const App = () => (
    <div>
        <Nav />
        <div className = "container">
            <Route exact path = "/" component = {Home} />
            <Route path = "/about" component = {About} />
            <Route path = "/editor" component = {Editor} />
            <Route path = "/textboard" component = {Textboards} />
        </div>
    </div>

);

export default App;
