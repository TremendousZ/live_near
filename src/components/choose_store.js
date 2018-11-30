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
            store:'',
        }
        this.storeCardContainer=[];
    }
    componentDidMount(){
        const {state, activity, store} = this.props.match.params;
        this.getStoreLocation(state);
        this.setState({
            activity,
            state,
            store
        });
    }

    mathRand(){
    	return Math.floor(Math.random()*10000)
    }

    async getStoreLocation(stateName){
        let stateSearchURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+this.props.match.params.store+"+in+" + stateName +"&key=AIzaSyD-NNZfs0n53D0caUB0M_ERLC2n9psGZfc";
        const resp = await axios.post(stateSearchURL);
        this.populateStoreList( resp );
    }

    populateStoreList( responseObj ){
        for(var index = 0; index < responseObj.data.results.length; index++){
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
                <div className = "store-instructions">Select a store that you would like to search nearby</div>
                    <div>
                        {this.state.storeCardContainer}
                    </div>
                </div>
            </div>
        )
    }
}

export default ChooseStore;