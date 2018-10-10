import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    render(){
        return (
            <nav className = "blue">
                <div className="nav-wrapper">
                    <Link to='/'></Link>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/editor">Editor</Link>
                        </li>
                        <li>
                            <Link to="/textboard">Textboards</Link>
                        </li>
                        <li>
                            <button className="btn blue darken-2">Sign In</button>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Nav;