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
      displayMenu: false,
      displayPinPrompt: true,
      displayBalance: false,
      displayWithdraw: false,
    };
  }


  confirmInput() {
    if (!this.state.pinApprove) {
      return fetchPin('https://frontend-challenge.screencloud-michael.now.sh/api/pin/', { pin: this.state.display })
        .then((response) => {
          console.log(response, 'res')
          if (response.ok) {
            response.json().then(res => {
              this.setState({
                balance: res.currentBalance,
                pinApprove: true,
                displayPinPrompt: false,
                displayMenu: true,
                display: ''
              },
                () => console.log(this.state, 'state'))
            })
          }
        })
    }
  }

  handleInput(e) {
    let display = this.state.display + e;
    this.setState({
      display,
    })
    if (this.state.pinApprove && this.state.displayMenu) {
      if (e == '1') {
        this.setState({
          displayBalance: true,
          display: ''
        })
      }
      if (e == '2') { this.setState({ 
            displayWithdraw: true,
               displayBalance: false, 
        displayMenu: false,
        display: ''}) }
    }
  }


  render() {
    return (
      <div>
        <div className="display">
          {this.state.displayBalance ? <div>Your balance is: {this.state.balance}</div> : null}
          {this.state.displayPinPrompt ? <div>Input Pin and press Enter</div> : null}

          {this.state.pinApprove && this.state.displayMenu ? <div>
            <div>Select:</div>
            {!this.state.displayBalance ? <div>1 Balance</div> : null}
            <div>2 Withdraw</div>
          </div>
            : null}
          {this.state.displayWithdraw ? <div>Select amount to withdraw:</div> : null}
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
            <p className="controlPadButton" onClick={() => this.confirmInput()}>Enter</p>
          </div>
        </div>
      </div>
    )
  }

}

export default ControlPad;
