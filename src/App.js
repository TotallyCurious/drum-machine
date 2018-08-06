import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="title">
          <h1>Drum-Kit</h1>
          </div>
          <div className="box">
            <ul className="pad-holder">
              <li className="pads pad1"><p>1</p></li>
              <li className="pads pad2"><p>2</p></li>
              <li className="pads pad3"><p>3</p></li>
              <li className="pads pad4"><p>4</p></li>
              <li className="pads pad5"><p>5</p></li>
              <li className="pads pad6"><p>6</p></li>
              <li className="pads pad7"><p>7</p></li>
              <li className="pads pad8"><p>8</p></li>
              <li className="pads pad9"><p>9</p></li>
            </ul>
          <div className="controls">
              <div className="control power"></div>
              <div className="control display"></div>
              <div className="control volume"></div>
              <div className="control bank"></div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
