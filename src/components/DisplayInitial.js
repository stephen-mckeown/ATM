
import React from 'react';
import './Display.css';


class DisplayInitial extends React.Component {
  render() {
    return (
      <div className="display">
        {!this.props.incorrectPin ?  <div>Input Pin and press Enter</div> : <div>Incorrect Pin, Please try again</div>}
        <div>{this.props.display}</div>
      </div>
    )
  }
}

export default DisplayInitial;