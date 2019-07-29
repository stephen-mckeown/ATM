import React from 'react';
import './ControlPad.css';
import { fetchPin } from './API.js';
import DisplayInitial from './DisplayInitial.js'
import DisplayMain from './DisplayMain.js'
import CashService from './CashService.js'


class ControlPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      balance: 0,
      display: '',
      displayMenu: false,
      displayBalance: false,
      displayWithdrawPrompt: false,
      incorrectPin: false,
      displayOverDrawnPrompt: false,
      overDrawnAmount: 0,
                input: ''
    };
  }

  confirmInput() {
    if (!this.state.loggedIn) {
      return fetchPin('https://frontend-challenge.screencloud-michael.now.sh/api/pin/', { pin: this.state.display })
        .then((response) => {
          if (response.ok) {
            response.json().then(res => {
              this.setState({
                balance: res.currentBalance,
                loggedIn: true,
                displayMenu: true,
                display: '',
              },
                // () => console.log(this.state, 'state')
              )
            })
          }
          if (!response.ok) {
            this.setState({
              display: '',
              incorrectPin: true
            })
          }
        })
    }
    if (this.state.displayWithdrawPrompt) {
      this.withDraw();
    }
  }

  cancelInput(){
       this.setState({
              display: '',
              input: ''
            })
  }

  withDraw(flag) {
    let balance = this.state.balance
    let input = this.state.input
    if (input % 5 !== 0) {
      alert('Enter amount in increments of £5');
      this.setState({
        displayMenu: true,
        displayWithdrawPrompt: false,
        display: ''
      })
      return;
    }
    if (balance - input < 0 && flag !== "confirm") {
      let overDrawnAmount = balance - input;
      this.setState({ overDrawnAmount })
      this.overDrawn();
      return
    }
    let cashTotalAtm = CashService.cashTotal();
    if (input > cashTotalAtm) {
      alert('Not sufficient cash at ATM');
      return;
    }
    balance -= this.state.input
    this.setState({ balance })
    this.cashOut(this.state.input)
  }

  cashOut(withdrawAmonut) {
    let cash = CashService.cashout(withdrawAmonut)
    alert('You recieve \n Twenties ' + cash.twenty + '\n Tens ' + cash.ten + '\n fives ' + cash.five);
    this.setState({
      displayMenu: true,
      displayWithdrawPrompt: false,
      display: ''
    })
  }

  overDrawn() {
    this.setState({
      displayOverDrawnPrompt: true,
      displayWithdrawPrompt: false,
      display: ''
    })
  }


  handleInput(e) {
    let display = this.state.display + e;
    let input = display
    this.setState({
      display, input
    })
    if (this.state.loggedIn && this.state.displayMenu && !this.state.displayOverDrawnPrompt) {
      if (e === '1') {
        this.setState({
          displayBalance: true,
          display: ''
        })
      }
      if (e === '2') {
        this.setState({
          displayWithdrawPrompt: true,
          displayBalance: false,
          displayMenu: false,
          display: ''
        })
      }
    }
    if (this.state.displayOverDrawnPrompt) {
      if (e === '1') {
        this.withDraw("confirm");
        this.setState({
          displayWithdrawPrompt: false,
          displayOverDrawnPrompt: false,
          display: ''
        })
      }
      if (e === '2') {
        this.setState({
          displayWithdrawPrompt: false,
          displayBalance: false,
          displayOverDrawnPrompt: false,
          displayMenu: true,
          display: '',
          input:''
        })
      }
    }
  }




  render() {
    return (
      <div>
        {!this.state.loggedIn ?
          <DisplayInitial display={this.state.display} incorrectPin={this.state.incorrectPin} />
          :
          <DisplayMain display={this.state.display} balance={this.state.balance} displayMenu={this.state.displayMenu} displayBalance={this.state.displayBalance} displayWithdrawPrompt={this.state.displayWithdrawPrompt} displayOverDrawnPrompt={this.state.displayOverDrawnPrompt} overDrawnAmount={this.state.overDrawnAmount} />
        }
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
            <p className="controlPadButton" onClick={() => this.cancelInput()}>Clear</p>
            <p className="controlPadButton" onClick={() => this.confirmInput()}>Enter</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ControlPad;
