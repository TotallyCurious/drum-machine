import React, { Component } from 'react';
import './App.css';

const P_START = '_ _ _ _ ';
const URL_BANK = ["https://res.cloudinary.com/totallycurious/video/upload/q_10/v1533657707/drum-machine/kick.wav",
"https://res.cloudinary.com/totallycurious/video/upload/q_10/v1534254303/drum-machine/la-native.wav",
"https://res.cloudinary.com/totallycurious/video/upload/q_10/v1533657707/drum-machine/snare.wav",
"http://res.cloudinary.com/totallycurious/video/upload/q_10/v1534254303/drum-machine/dash-runner.wav",
"https://res.cloudinary.com/totallycurious/video/upload/q_10/v1533657707/drum-machine/cowbell.wav",
"https://res.cloudinary.com/totallycurious/video/upload/q_10/v1534254302/drum-machine/retro-2.wav",
"https://res.cloudinary.com/totallycurious/video/upload/q_10/v1533657707/drum-machine/hihat1.wav",
"https://res.cloudinary.com/totallycurious/video/upload/q_10/v1534254300/drum-machine/detective.wav",
"https://res.cloudinary.com/totallycurious/video/upload/q_10/v1533657707/drum-machine/cymbal.wav",
"https://res.cloudinary.com/totallycurious/video/upload/q_10/v1534254300/drum-machine/fast-ace.wav",
"https://res.cloudinary.com/totallycurious/video/upload/q_10/v1533657706/drum-machine/tomtom.wav",
"https://res.cloudinary.com/totallycurious/video/upload/q_10/v1534254298/drum-machine/arcade-funk.wav",
"https://res.cloudinary.com/totallycurious/video/upload/q_10/v1533657706/drum-machine/hihat4.wav",
"https://res.cloudinary.com/totallycurious/video/upload/q_10/v1534254303/drum-machine/retro-gap.wav",
"https://res.cloudinary.com/totallycurious/video/upload/q_10/v1533657708/drum-machine/china.wav",
"https://res.cloudinary.com/totallycurious/video/upload/q_10/v1534254299/drum-machine/androids.wav",
"https://res.cloudinary.com/totallycurious/video/upload/q_10/v1533657707/drum-machine/ride.wav",
"https://res.cloudinary.com/totallycurious/video/upload/q_10/v1534254297/drum-machine/ducky.wav"]
const BANK_DATA = {
  Q: ["KICK", "LA-NATIVE"],
  W: ["SNARE", "DASH-RUNNER"],
  E: ["COWBELL", "RETRO-2"],
  A: ["HIHAT1", "DETECTIVE"],
  S: ["CYMBAL", "FAST-ACE"],
  D: ["TOMTOM", "ARCADE-FUNK"],
  Z: ["HIHAT4", "RETRO-GAP"],
  X: ["CHINA", "ANDROIDS"],
  C: ["RIDE", "DUCKY"]
} 
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isActive:true,
      volume:50,
      bankOn:false,
      display:'START',
      audioUrl:URL_BANK,
      audioFlag:false,
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
    if(this.state.isActive){
      this.updateDisplay(e.currentTarget.id);
      this.playAudio(e.currentTarget.id);
      //play corresponding audio
      //  --
    }
    
  }
  playAudio(id){
    const audio = document.getElementById(id+"-audio");
    audio.currentTime=0;
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
        display: BANK_DATA[id][1]
      })
    }
  }
  componentWillMount(){
    this.handleVolumeChange(50);
  }
  render() {
    var pads = [];
    for(var i=0;i<9;i++){
      pads.push(<li className="pads" id={Object.keys(BANK_DATA)[i]} onClick={this.handlePadSmash}>
          <audio id={Object.keys(BANK_DATA)[i] + "-audio"} src={!this.state.bankOn ? this.state.audioUrl[i * 2] : this.state.audioUrl[(i * 2) + 1]} className="clip" />
          <p>{Object.keys(BANK_DATA)[i]}</p>
        </li>);
    }
    return <div className="App">
        <div className="container">
          <div className="title">
            <h1>Drum-Kit</h1>
          </div>
          <div className="box">
            <ul className="pad-holder">
              {pads}
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
