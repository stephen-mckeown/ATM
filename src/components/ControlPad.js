import React from 'react';
import './ControlPad.css';
import { fetchPin } from './API.js'


class ControlPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinApprove: false,
      balance: 0,
      display: '',
      displayPinPrompt: true
    };
  }


  checkPin() {
    console.log("checkPin")
    return fetchPin('https://frontend-challenge.screencloud-michael.now.sh/api/pin/', { pin: this.state.display })
      .then((response) => {
        console.log(response, 'res')
        if (response.ok) {
          response.json().then(res => {
            console.log(res.currentBalance, 'res.json()')
            this.setState({
              balance: res.currentBalance,
              pinApprove: true,
            },
            ()=> console.log(this.state, 'state'))
          })
        }
      })
  }

  handleInput(e) {
    console.log(e, 'e');
    let display = this.state.display + e;
    this.setState({
      display,
      displayPinPrompt: false
    })
  }


  render() {
    return (
      <div>

        <div className="display">
          {this.state.displayPinPrompt ? <div>Input Pin</div> : null}
          <div>{this.state.display}</div>
        </div>

        <div className="controlPad">
          <div className="controlPadRow">
            <p className="controlPadButton" onClick={() => this.handleInput('1')}>1</p>
            <p className="controlPadButton" onClick={() => this.handleInput('2')}>2</p>
            <p className="controlPadButton" onClick={() => this.handleInput('3')}>3</p>
          </div>
          <div className="controlPadRow">
            <p className="controlPadButton" onClick={() => this.handleInput('4')}>4</p>
            <p className="controlPadButton" onClick={() => this.handleInput('5')}>5</p>
            <p className="controlPadButton" onClick={() => this.handleInput('6')}>6</p>
          </div>
          <div className="controlPadRow">
            <p className="controlPadButton" onClick={() => this.handleInput('7')}>7</p>
            <p className="controlPadButton" onClick={() => this.handleInput('8')}>8</p>
            <p className="controlPadButton" onClick={() => this.handleInput('9')}>9</p>
          </div>
          <div className="controlPadRow">
            <p className="controlPadButton">#</p>
            <p className="controlPadButton" onClick={() => this.handleInput('0')}>0</p>
            <p className="controlPadButton">#</p>
          </div>
          <div className="controlPadRow">
            <p className="controlPadButton">Clear</p>
            <p className="controlPadButton" onClick={() => this.checkPin()}>Confirm</p>
          </div>
        </div>

      </div>
    )
  }

}

export default ControlPad;
