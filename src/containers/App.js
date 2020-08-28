import React, { Component } from 'react';
import {connect} from 'react-redux';
import Cardlist from '../components/cardlist';
import SearchBox from '../components/searchbox';
import Scroll from '../components/scroll';
import './App.css'; 

import {setSearchField, requestRobots} from '../actions';

const mapStateToProps=state=>{
    return{
        searchfield:state.searchRobots.searchfield,
        robots:state.requestRobots.robots,
        isPending:state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
    onSearchChange:(event)=>dispatch(setSearchField(event.target.value)),
    onRequestRobots:()=> dispatch(requestRobots())
    }
 }
class App extends Component{
   

componentDidMount(){
 this.props.onRequestRobots();
}


    render(){
       
        const {searchfield, onSearchChange,robots,isPending}=this.props;
            const filteredRobots=robots.filter(robots=>{
            return robots.name.toLowerCase().includes(searchfield.toLowerCase())
            })
                return isPending?
                <h1>loading</h1>:
                (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange}/>
                    <Scroll>
                    <Cardlist robots={filteredRobots}/>
                    </Scroll>
                </div>
                );
            }
    }
    
export default connect(mapStateToProps,mapDispatchToProps)(App);