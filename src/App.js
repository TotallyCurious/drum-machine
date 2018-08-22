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
const KEY_CODES = {81:'Q',87:'W',69:'E',65:'A',83:'S',68:'D',90:'Z',88:'X',67:'C'}

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isActive:true,
      volume:5,
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
  this.playAudio = this.playAudio.bind(this);
  this.handleKeyPress = this.handleKeyPress.bind(this);
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
      var myId = e.currentTarget.id.split('-')[0];
      this.updateDisplay(myId);
      this.playAudio(myId);
    }
  }
  handleKeyPress(e){
    if (Object.keys(KEY_CODES).includes(e.keyCode.toString())){
      this.playAudio(KEY_CODES[e.keyCode]);
      this.updateDisplay(KEY_CODES[e.keyCode]);
    }
  }
  playAudio(id){
    const audio = document.getElementById(id);
    audio.currentTime=0;
    // audio.volume = 0.5;
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
    this.handleVolumeChange(5);
    const script = document.createElement("script");
    script.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
    script.async = true;
    document.body.appendChild(script);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  render() {
    var pads = [];
    for(var i=0;i<9;i++){
      pads.push(<li className="pads drum-pad" id={Object.keys(BANK_DATA)[i] + "-audio"} onClick={this.handlePadSmash}>
          <audio volume={this.state.volume/10} id={Object.keys(BANK_DATA)[i]} src={!this.state.bankOn ? this.state.audioUrl[i * 2] : this.state.audioUrl[(i * 2) + 1]} className="clip" />
          <p>{Object.keys(BANK_DATA)[i]}</p>
        </li>);
    }
    return <div className="App">
        <div className="container">
          <div className="title">
            <h1>Drum-Kit</h1>
          </div>
          <div className="box">
            <ul className="pad-holder" onKeyPress={this.handleKeyPress}>
              {pads}
            </ul>
            <div className="controls" id="drum-machine">
              <div className="control" id="display">
                <p className="display-text" id="display-primary">
                  {this.state.display}
                </p>
                <p className="display-text display-sub" id="display-power">
                  Bank:{this.state.bankOn ? 2 : 1} PWR: {this.state.isActive ? "ON" : "OFF"}
                </p>
              </div>
              <div className="control" id="volume">
                <input type="range" min="0" max="10" value={this.state.volume} className="slider" id="myRange" onChange={this.handleVolumeChange} />
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
// class DrumPads extends Component{
//   constructor(props){
//     super(props);
//   }
//   render(){
//     return{

//     }
//   }
// }

export default App;
