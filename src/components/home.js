import React from 'react';

export default props => (
    <div>
        <h1 className="center">Escape Room Enhancer</h1>
        <div>
            <span>Admin</span>
        </div>
        <div>
            <span>Location</span>
        </div>
        <form>
            <input type = "text" placeholder="User"></input>
            <input type="password" placeholder ="Password"></input>
        </form>   
    </div>
);