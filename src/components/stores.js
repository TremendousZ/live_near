import React, {Component} from 'react';

class Stores extends Component{ 


    render(){
        return(
            <div>
                <h1 className="center">Please Select Your Favorite Stores</h1>
                <form>
                    <label>Store Name:</label>
                    <input/>
                    <label>Store Type:</label>
                    <input />
                </form>
            </div>       
        )
    }
}

export default Stores;