import React, { Component } from 'react';
import '../css/Profiles.css';
import Header from './Header';
import Footer from './Footer';
import BandProfileResults from './BandProfileResults';
import axios from 'axios';

class MusicianProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instruments: [],
            name: '',
            genre: '',
            location: '',
            description: '',
            professionalAccount: '',
            bandMembers: []
        };

        this.configureProfile = this.configureProfile.bind(this);
    }

    configureProfile = async event => {
        window.location.href = "/configure";
    }

    async componentDidMount(){
    
        await axios.post('http://localhost:5000/api/user/profile/band', {
            email: localStorage.contactEmail
        }).then(res => {
            console.log(localStorage.email)
            this.state.result = res.data;
            console.log(this.state.result);
            this.state.listResult = this.state.result.map(
                result => <BandProfileResults
                    // id={result.id}
                    key={result._id}
                    name={result.name}
                    email={result.email}
                    genres={result.genres}
                    location={result.location}
                    description={result.description}
                    professionalAccount={result.professionalAccount}
                    bandMembers={result.bandMembers}
                />);
        });

        if(localStorage.email !== localStorage.contactEmail){
            document.getElementById("configureButtons").style.display = "none";
        }else{
            document.getElementById("configureButtons").style.display = "block";
        }

        this.forceUpdate();
    }


    render() {  
        const style={
            // backgroundImage: "url('/backgrounds/grayBlur.jpg')",
            height: "100vh",
            width: "100%",
            backgroundRepeat: "repeat"
        }

        return (
            <div className="profile" style={style}>
                <Header />
                <div id="configureButtons">
                    <button type="button" id="configureBtn" onClick={this.configureProfile}> <span>Configure profile </span></button>
                    <br/>
                    <button className="button" id="configureBtn"><a href="/MyAds"><span>Show my ads</span></a></button>
                </div>
                {this.state.listResult}
                <Footer />
            </div>
        );
    }
}

export default MusicianProfile;