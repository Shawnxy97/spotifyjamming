import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {term: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e){
        this.setState({term: e.target.value});
    }

    handleClick(){
        this.props.onSearch(this.state.term);
        document.getElementById("searchbar").value = "";
    }
    render(){
        return (
            <div className='SearchBar'>
                <input id="searchbar" type="text" placeholder="Enter A Song, Album, or Artist" onChange={this.handleChange}/>
                <button className='SearchButton' onClick={this.handleClick}>SEARCH</button>
            </div>
        );
    }
}