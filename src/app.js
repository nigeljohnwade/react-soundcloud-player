import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ProgressSoundPlayer from './components/ProgressSoundPlayer';
import SC from 'node-soundcloud';
import Loading from 'react-loading';
import {client_id} from './config';

SC.init({
    id: client_id
});

class Main extends Component {
    constructor(props){
        super();
        this.state = {
            query: '', 
            'bpm[from]': 0,
            'bpm[to]': 119,
            hasResults: false,
            searchResults: [],
            isLoading: false
        }
    }
    handleTextChange(event){
        this.setState({
            query: event.target.value
        });
        if(event.key === 'Enter'){
            this.search.call(this);
        }
    }
    handleRangeChange(event){
        this.setState({
            query: event.target.value
        });
        if(event.key === 'Enter'){
            this.search.call(this);
        }
    }
    search(){
        this.setState({
            isLoading: true
        });

        SC.get('/tracks', {
            q: this.state.query,
            'bpm[from]': this.state['bpm[from]'],
            'bpm[to]': this.state['bpm[to]'],
            embeddable_by: 'all',
            limit: 100
        }, (err, tracks) => {
            if(!err){
                console.log(tracks);
                this.setState({
                    hasResults: true,
                    searchResults: tracks,
                    isLoading: false
                });
            }
        });
    }
    render(){
        return (
            <div>
                <h1>Electron SoundCloud Player</h1>
                <input type="search"
                       onKeyUp={this.handleTextChange.bind(this)}
                       className="search-field"
                       placeholder="Enter song name or artist..." />
                <button className="search-button"
                        onClick={this.search.bind(this)}>Search</button>
                <div className="center">
                    {this.state.isLoading && <Loading type="bars" color="#FFB935" />}
                </div>
                {this.state.hasResults && !this.state.isLoading ?
                    this.renderSearchResults.call(this) :
                    this.renderNoSearchResults.call(this)}
            </div>
        );
    }
    renderNoSearchResults(){
        return (
            <div id="no-results"></div>
        );
    }
    renderSearchResults(){
        return (
            <div id="search-results">
                {this.state.searchResults.map(this.renderPlayer.bind(this))}
            </div>
        );
    }
    renderPlayer(track){
        return (
            <ProgressSoundPlayer
                key={track.id}
                clientId={client_id}
                resolveUrl={track.permalink_url} />
        );
    }
}

var main = document.getElementById('main');
ReactDOM.render(<Main />, main);
