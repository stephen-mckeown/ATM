
import React from 'react';
import './Display.css';


class DisplayInitial extends React.Component {
  render() {
    return (
      <div className="display">
        <div>Input Pin and press Enter</div>
        {this.props.incorrectPin ? <div>Incorrect Pin, Please try again</div> : null}
        <div>{this.props.display}</div>
      </div>
    )
  }
}

export default DisplayInitial;