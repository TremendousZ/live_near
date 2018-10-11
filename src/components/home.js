import React from 'react';

export default props => (
    <div>
        <h1 className="center">Live near</h1>
       
        <form>
            <label>User Name</label>
            <input type = "text" placeholder="User"/>
            <label>Password</label>
            <input type="password" placeholder ="Password"/>
            <button>Submit</button>
        </form>
        <button>Continue</button>
        <p>You search will not be saved until you login</p>   
    </div>   
);