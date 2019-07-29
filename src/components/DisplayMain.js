import React from 'react';
import './Display.css';


class DisplayMain extends React.Component {
  render() {
    return (
      <div className="display">
        {this.props.displayBalance ? <div>Your balance is: {this.props.balance}</div> : null}
        {this.props.displayMenu ? <div>
                                    <div>Select:</div>
                                    {!this.props.displayBalance ? <div>1 Balance</div> : null}
                                    <div>2 Withdraw</div>
                                  </div>
                                : null}
        {this.props.displayWithdrawPrompt ? <div>Enter amount to withdraw:</div> : null}
        {this.props.displayOverDrawnPrompt ? 
                            <div>
                              <div>This will leave you overdrawn by {this.props.overDrawnAmount}</div> 
                              <div>Select:</div>
                              <div>1 Proceed</div>
                              <div>2 Cancel</div>
                            </div>
                                    : null}
        <div className="input">{this.props.display}</div>
      </div>
    )
  }
}

export default DisplayMain;