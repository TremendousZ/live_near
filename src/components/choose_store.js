import React,{Component} from 'react';
import StoreCard from './store_card';
import axios from 'axios';
class ChooseStore extends Component{
    constructor(props){
        super(props);

        this.state = {
            storeCardContainer:'',
            activity:'',
            state:'',
        }
        this.storeCardContainer=[];
    }
    componentDidMount(){
        const {state, activity} = this.props.match.params;
        this.getWholeFoodsLocation(state);
        this.setState({
            activity,
            state
        });
    }

    mathRand(){
    	return Math.floor(Math.random()*10000)
    }

    async getWholeFoodsLocation(stateName){
        let stateSearchURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=wholefoods+in+" + stateName +"&key=AIzaSyD-NNZfs0n53D0caUB0M_ERLC2n9psGZfc";
        const resp = await axios.post(stateSearchURL);
        console.log("check this response", resp);
        this.populateStoreList( resp );
    }

    populateStoreList( responseObj ){
        for(var index = 0; index < responseObj.data.results.length; index++){
            let photoRef = responseObj.data.results[index].photos[0].photo_reference;
            let locationObj = responseObj.data.results[index].geometry.location;
            let streetAddress = responseObj.data.results[index].formatted_address;
            let temp = <StoreCard key = {this.mathRand()+'o'+index} details = {responseObj.data.results[index]} {...this.props} />
            this.storeCardContainer.push(temp);
        }
        this.setState({
            storeCardContainer: this.storeCardContainer,
        })
    }


    render(){
        return (
            <div>
                <div className = "storeSelectionBox">
                <div>Select a store that you would like to search by</div>
                    <div>
                        {this.state.storeCardContainer}
                    </div>
                </div>
            </div>
        )
    }
}

export default ChooseStore;