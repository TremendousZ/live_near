import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class Nav extends Component {
    renderAuthButtons(){
        const { auth, signIn, signOut} = this.props;
        if(auth){
            return <button onClick={signOut} className="btn orange">Sign Out</button>
        } else {

        return <button onClick={signIn} className="btn green">Sign In</button>
        }
    }

    render(){
        return (
            <nav className = "navColor">
                <div className="nav-wrapper">
                    <Link to='/'></Link>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/answer">Answer</Link>
                        </li>
                        <li>
                            {this.renderAuthButtons()}
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state){
    return {
        auth: state.user.auth,
    }
}

export default connect(mapStateToProps, {
    signIn,
    signOut
})(Nav);