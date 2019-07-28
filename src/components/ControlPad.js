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
      displayPinPrompt: true,
      displayBalance: false,
      displayWithdraw: false,
      incorrectPin: false,
      displayOverDrawn: false,
    };
  }

  confirmInput() {
    if (!this.state.loggedIn) {
      return fetchPin('https://frontend-challenge.screencloud-michael.now.sh/api/pin/', { pin: this.state.display })
        .then((response) => {
          // console.log(response);
          if (response.ok) {
            response.json().then(res => {
              this.setState({
                balance: res.currentBalance,
                loggedIn: true,
                displayPinPrompt: false,
                displayMenu: true,
                display: ''
              },
                 () => console.log(this.state, 'state')
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
    if (this.state.displayWithdraw) {
      let balance = this.state.balance
      let withdrawAmonut = this.state.display
      if (withdrawAmonut % 5 !== 0){
        alert('Enter amount in increments of £5');
        this.setState({
          displayMenu: true,
          displayWithdraw: false,
          display: ''
        })
        return;
      }
      if (balance - withdrawAmonut < 0){
        this.setState({ displayOverDrawn: true })
        // alert('This will leave you ' + (balance - withdrawAmonut) + '\n Overdrawn');
      }
        balance -= withdrawAmonut
      let cashTotalAtm = CashService.cashTotal();

      if (withdrawAmonut > cashTotalAtm) {
        alert('Not sufficient cash at ATM');
        return;
      }
      this.setState({ balance })
      let cashout = CashService.cashout(withdrawAmonut)
      alert('You recieve \n Twenties ' + cashout.twenty + '\n Tens ' + cashout.ten + '\n fives ' + cashout.five);
      this.setState({
        displayMenu: true,
        displayWithdraw: false,
        display: ''
      })
    }
  }

  handleInput(e) {
    let display = this.state.display + e;
    this.setState({
      display,
    })
    if (this.state.loggedIn && this.state.displayMenu) {
      if (e === '1') {
        this.setState({
          displayBalance: true,
          display: ''
        })
      }
      if (e === '2') {
        this.setState({
          displayWithdraw: true,
          displayBalance: false,
          displayMenu: false,
          display: ''
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
          <DisplayMain display={this.state.display} balance={this.state.balance} displayMenu={this.state.displayMenu} displayBalance={this.state.displayBalance} displayWithdraw={this.state.displayWithdraw} displayOverDrawn={this.state.displayOverDrawn} />
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
            <p className="controlPadButton">Clear</p>
            <p className="controlPadButton" onClick={() => this.confirmInput()}>Enter</p>
          </div>
        </div>
      </div>
    )
  }

}

export default ControlPad;
