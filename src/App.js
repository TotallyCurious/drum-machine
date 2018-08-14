import React, { Component } from 'react';
import './App.css';

const P_START = '_ _ _ _ ';
const BANK_DATA = {
                "Q":['KICK',"https://res.cloudinary.com/totallycurious/video/upload/v1533657707/drum-machine/kick.mp3",
                      
                  'LA-NATIVE', "https://res.cloudinary.com/totallycurious/video/upload/v1534254303/drum-machine/la-native.wav"], 

                "W":['SNARE',"https://res.cloudinary.com/totallycurious/video/upload/v1533657707/drum-machine/snare.mp3",
                      
                  'DASH-RUNNER', "https://res.cloudinary.com/totallycurious/video/upload/v1534254303/drum-machine/dash-runner.wav"],

                "E":['COWBELL',"https://res.cloudinary.com/totallycurious/video/upload/v1533657707/drum-machine/cowbell.mp3",
                      
                  'RETRO-2', "https://res.cloudinary.com/totallycurious/video/upload/v1534254302/drum-machine/retro-2.wav"],

                 "A":['HIHAT1',"https://res.cloudinary.com/totallycurious/video/upload/v1533657707/drum-machine/hihat1.mp3",
                      
                   'DETECTIVE', "https://res.cloudinary.com/totallycurious/video/upload/v1534254300/drum-machine/detective.wav"], 

                "S":['CYMBAL', "https://res.cloudinary.com/totallycurious/video/upload/v1533657707/drum-machine/cymbal.mp3",
                      
                  'FAST-ACE', "https://res.cloudinary.com/totallycurious/video/upload/v1534254300/drum-machine/fast-ace.wav"],
 
                "D":['TOMTOM', "https://res.cloudinary.com/totallycurious/video/upload/v1533657706/drum-machine/tomtom.mp3",
                      
                  'ARCADE-FUNK', "https://res.cloudinary.com/totallycurious/video/upload/v1534254298/drum-machine/arcade-funk.mp3"],

                "Z":['HIHAT4', "https://res.cloudinary.com/totallycurious/video/upload/v1533657706/drum-machine/hihat4.mp3",
                      
                  'RETRO-GAP', "https://res.cloudinary.com/totallycurious/video/upload/v1534254303/drum-machine/retro-gap.wav"], 

                "X":['CHINA', "https://res.cloudinary.com/totallycurious/video/upload/v1533657708/drum-machine/china.mp3",
                      
                  'ANDROIDS', "https://res.cloudinary.com/totallycurious/video/upload/v1534254299/drum-machine/androids.wav"],
 
                "C":['RIDE', "https://res.cloudinary.com/totallycurious/video/upload/v1533657707/drum-machine/ride.mp3",
                      
                  'DUCKY', "https://res.cloudinary.com/totallycurious/video/upload/v1534254297/drum-machine/ducky.mp3"],

}; 
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isActive:true,
      volume:50,
      bankOn:false,
      display:'START',
      audioUrl:'',
    }
  this.handleVolumeChange = this.handleVolumeChange.bind(this);
  this.handlePowerToggle = this.handlePowerToggle.bind(this);
  this.handleBankToggle = this.handleBankToggle.bind(this);
  this.updateDisplay = this.updateDisplay.bind(this);
  this.handlePadSmash = this.handlePadSmash.bind(this);
  this.playAudio = this.playAudio.bind(this)
  }
  handlePowerToggle(){
    const currentState = this.state.isActive;
    this.setState({
      isActive:!currentState
    })
    if(this.state.isActive){
      // enable the drum pad 
      this.setState({
        display: P_START
      })
    }
    else if(!this.state.isActive){
      // disable the drum pad
      this.setState({
        display: 'START'
      })
    }
  }
  handleBankToggle(){
    const currentState = this.state.bankOn;
    if(this.state.isActive){
      this.setState({
        bankOn: !currentState
      })
    }
  }
  handlePadSmash(e){
    console.log(BANK_DATA[e.currentTarget.id][1]);
    console.log(e.currentTarget.id);
    if(this.state.isActive){
      this.updateDisplay(e.currentTarget.id);
      this.playAudio(e.currentTarget.id);
      //play corresponding audio
      //  --
    }
    
  }
  playAudio(id){
    console.log(id);
    const audio = document.getElementById(id+"-audio");
    this.setState({
      audioUrl: BANK_DATA[id][1]
    })
    //const audio = document.getElementById("temp-audio");
    //audio.currentTime=0;
    audio.play();
  }
  handleVolumeChange(props){
    this.setState({
      volume:props.value,
    })
  }
  updateDisplay(id){
    if(!this.state.bankOn){
      this.setState({
        display: BANK_DATA[id][0]
      })
    }
    else if(this.state.bankOn){
      this.setState({
        display: BANK_DATA[id][2]
      })
    }
  }
  componentWillMount(){
    this.handleVolumeChange(50);
  }
  
  render() {
    return <div className="App">
        <div className="container">
          <div className="title">
            <h1>Drum-Kit</h1>
          </div>
          <div className="box">
            <ul className="pad-holder">
              <li className="pads" id="Q" onClick={this.handlePadSmash}>
                <audio id="Q-audio" src={this.state.audioUrl} className="clip" />
                <p>Q</p>
              </li>
              <li className="pads" id="W" onClick={this.handlePadSmash}>
              <audio id="W-audio" src={this.state.audioUrl} className="clip" />
                <p>W</p>
              </li>
              <li className="pads" id="E" onClick={this.handlePadSmash}>
              <audio id="E-audio" src={this.state.audioUrl} className="clip" />
                <p>E</p>
              </li>
              <li className="pads" id="A" onClick={this.handlePadSmash}>
              <audio id="A-audio" src={this.state.audioUrl} className="clip" />
                <p>A</p>
              </li>
              <li className="pads" id="S" onClick={this.handlePadSmash}>
                <audio id="S-audio" src={this.state.audioUrl} className="clip" />
                <p>S</p>
              </li>
              <li className="pads" id="D" onClick={this.handlePadSmash}>
                <audio id="D-audio" src={this.state.audioUrl} className="clip" />
                <p>D</p>
              </li>
              <li className="pads" id="Z" onClick={this.handlePadSmash}>
                <audio id="Z-audio" src={this.state.audioUrl} className="clip" />
                <p>Z</p>
              </li>
              <li className="pads" id="X" onClick={this.handlePadSmash}>
                <audio id="X-audio" src={this.state.audioUrl} className="clip" />
                <p>X</p>
              </li>
              <li className="pads" id="C" onClick={this.handlePadSmash}>
                <audio id="C-audio" src={this.state.audioUrl} className="clip" />
                <p>C</p>
              </li>
            </ul>
            <div className="controls">
              <div className="control" id="display">
                <p className="display-text" id="display-primary">
                  {this.state.display}
                </p>
                <p className="display-text display-sub" id="display-power">
                  Bank:{this.state.bankOn ? 2 : 1} PWR: {this.state.isActive ? "ON" : "OFF"}
                </p>
              </div>
              <div className="control" id="volume">
                <input type="range" min="1" max="100" value={this.state.volume} className="slider" id="myRange" onChange={this.handleVolumeChange} />
              </div>
              <div className="button-container control">
                <div className="control" id="power">
                  <div className="power-element" id="power-on-indicator">
                    <em>ON</em>
                  </div>

                  <div className="power-element" id="power-switch" onClick={this.handlePowerToggle}>
                    <div id="power-knob" className={this.state.isActive ? null : "power-on"} />
                  </div>

                  <div className="power-element" id="power-off-indicator">
                    <em>OFF</em>
                  </div>
                </div>
                <div className="control" id="bank">
                  <div className="bank-element" id="bank-1">
                    <strong>1</strong>
                  </div>
                  <div className="bank-element" id="bank-switch" onClick={this.handleBankToggle}>
                    <div id="bank-knob" className={this.state.bankOn ? "power-on" : null} />
                  </div>
                  <div className="bank-element" id="bank-2">
                    <strong>2</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
}
class DrumPads extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return{
      
    }
  }
}

export default App;
