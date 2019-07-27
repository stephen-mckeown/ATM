import React from 'react';
import './Display.css';


class DisplayMain extends React.Component {
  render() {
    console.log(this.props, 'props')
    return (
      <div className="display">
        {this.props.displayBalance ? <div>Your balance is: {this.props.balance}</div> : null}
        {this.props.displayMenu ? <div>
                                    <div>Select:</div>
                                    {!this.props.displayBalance ? <div>1 Balance</div> : null}
                                    <div>2 Withdraw</div>
                                  </div>
                                : null}
        {this.props.displayWithdraw ? <div>Enter amount to withdraw:</div> : null}
        <div>{this.props.display}</div>
      </div>
    )
  }
}

export default DisplayMain;