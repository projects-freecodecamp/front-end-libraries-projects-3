import React, {Component, useState} from 'react';
import data from './assets/data.json';

let drumPad = {
  backgroundColor: "grey",
  marginTop: "10px",
  boxShadow: "black 3px 3px 5px"
}

let floats = {
  floatR: {
    float: "right"
  },
  floatL: {
    float: "left"
  }
}

class App extends Component {
  state = {
    soundsOne: [],
    soundsTwo: [],
    soundsPlayOne: true,
    volume: 0,
    power: true,
    bank: true,
    idKey: '',
    keyTrigger: 'q'
  }

  componentDidMount() {
    this.setState({
      soundsOne: data[0],
      soundsTwo: data[1],
    });
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (e) =>{
    this.setState({keyTrigger: e.key})
    let key = this.state.keyTrigger

    if (e.key === key) {
      let keyTrigger = key.toUpperCase()
      this.playSound({ keyCode: '', keyTrigger, id: '', url: '' });
    }
  }

  handleChangeFloatPower = (event) => {
    this.setState({power: !this.state.power})
  }
  handleChangeFloatBank = (event) => {
    this.setState({
      bank: !this.state.bank,
      soundsPlayOne: !this.state.soundsPlayOne
    })
  }

  handleChangeVolumen = (event) => {
    this.setState({
      volume: event
    })
  }

  playSound = ({ keyCode, keyTrigger, id, url }) => {
    this.setState({ idKey: id, keyTrigger})
    const sound = document.getElementById(keyTrigger);
    sound.currentTime = 0;
    sound.play();
    sound.volume = this.state.volume
  }

  render() {
    let { power, bank, idKey } = this.state

    if (!this.state.soundsOne) return;

    return (
      <div id="drum-machine" className="inner-container">
        <div className="pad-bank">
          {
            this.state.soundsPlayOne ?
              this.state.soundsOne.map(item => <DrumPad key={item.id} item={item} onClick={this.playSound}/>) :
              this.state.soundsTwo.map(item => <DrumPad key={item.id} item={item} onClick={this.playSound}/>)
          }
        </div>

        <Logo />

        <div className="controls-container">
          <div className="control">
            <p>Power</p>
            <div className="select">
              <div className="inner"
                   style={power ? floats.floatR : floats.floatL }
                   onClick={this.handleChangeFloatPower}>
              </div>
            </div>
          </div>

          <p id="display">&nbsp; {idKey ? idKey : null}</p>

          <Volume volume={this.state.volume} onChangeVolumen={this.handleChangeVolumen} />

          <div className="control">
            <p>Bank</p>
            <div className="select">
              <div className="inner"
                style={bank ? floats.floatR : floats.floatL}
                onClick={power ? this.handleChangeFloatBank : () => {}}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Volume = ({volume, onChangeVolumen}) => {
  return  <div className="volume-slider">
    <input type="range" step="0.01" min="0" max="1" value={volume} onChange={()=>onChangeVolumen(event.target.value)} />
  </div>
}

const Logo = () =>
  <div className="logo">
    <div className="inner-logo ">FCC&nbsp;</div>
    <i className="inner-logo fa fa-free-code-camp"/>
  </div>

const DrumPad = (props) => {
  let { keyCode, keyTrigger, id, url } = props.item
  function handleClickDrumPad() {
    // console.log('Item: ', props.item)
  }

  return <div id={id} className="drum-pad" style={drumPad} onClick={() => props.onClick(props.item)}>
    <audio className="clip" id={keyTrigger} src={url} />
    { keyTrigger }
  </div>
}

export default App;
