import React, { Component } from 'react';
import axios from 'axios';
import CheckGenres from './CheckGenres';
import CheckLocation from './CheckLocation';
import CheckInstruments from './CheckInstruments';
import '../css/FindMBT.css';


class CreateAdMusician extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: '',
                description: '',
                user: '',
                accountType: '',
                instruments: [],
                genres: []
            }
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
    }
        

    onTitleChange(title) {
        const data = {
            title: title.target.value,
            description: this.state.data.description,
            user: localStorage.email,
            accountType: localStorage.accountType,
            instruments: this.state.data.instruments,
            genres: this.state.data.genres
        };
        this.setState({
            data
        });
    }

    onDescriptionChange(description) {
        const data = {
            title: this.state.data.title,
            description: description.target.value,
            user: localStorage.email,
            accountType: localStorage.accountType,
            instruments: this.state.data.instruments,
            genres: this.state.data.genres
        };
        this.setState({
            data
        });
    }
    applyFilter(event){
        var checkedInstruments = []; 
        var checkedGenres = [];
        var instruments = document.getElementsByClassName('instruments');
        var genres = document.getElementsByClassName('genres');
        for(var i=0; instruments[i]; ++i){
            // console.log(inputElements)
            if(instruments[i].checked){
                checkedInstruments.push(instruments[i].value);
                
             }
        }
        for(var i=0; genres[i]; ++i){
            // console.log(inputElements)
            if(genres[i].checked){
                checkedGenres.push(genres[i].value);
                
             }
        }
        console.log(checkedInstruments)
        console.log(checkedGenres)
        const data = {
            title: this.state.data.title,
            description: this.state.data.description,
            user: localStorage.email,
            accountType: localStorage.accountType,
            instruments: checkedInstruments,
            genres: checkedGenres
        };
        this.setState({
            data
        });
        console.log(this.state.data)
    }

    handleOnSubmit = async event => {
        event.preventDefault();
        const data = this.state.data;
        try {
            await axios.post('http://localhost:5000/api/forum/create', data);
        } catch (e) {
            console.log("Nije uspelo!");
        }
        
    };
    
    
    render() {
        return (
            <div>
                
                 <div id="boxes"> 
                 <img src="/dark.png" alt="image_background"/>
                    <div className="container" id="left">
                        <CheckInstruments  />
                        <hr style={{height:"1px", backgroundColor:"#343a40"}}/>
                        <CheckGenres /> 
                        <hr style={{height:"1px", backgroundColor:"#343a40"}}/>
                        <CheckLocation /> 
                        <hr style={{height:"1px", backgroundColor:"#343a40"}}/>
                        <button  class="button" style={{borderRadius: "50%", backgroundColor: "#343a40"}} onClick={this.applyFilter}>
                            <span>Apply</span>
                        </button>
                        <div className="container" id="containerList">
                            <form id="formAccount">
                                <div className="form-group">
                                    <label htmlFor="title">Title:</label>
                                    <input type="title" className="form-control" id="title" placeholder="Enter title" name="title" onChange={this.onTitleChange} />
                                    <textarea type="description" id="description"  placeholder="Type description..." name="description" onChange={this.onDescriptionChange}></textarea>
                                </div>
                                <button type="button" onClick={this.handleOnSubmit} className="btn btn-success">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
                   
            
        );
    }

}

export default CreateAdMusician;