import React from 'react';
import './ControlPad.css';


class ControlPad extends React.Component {


render (){
  return (
    <div className="controlPad">
      <div className="controlPadRow">
        <p className="controlPadButton">1</p>
        <p className="controlPadButton">2</p>
        <p className="controlPadButton">3</p>
      </div>
      <div className="controlPadRow">
        <p className="controlPadButton">4</p>
        <p className="controlPadButton">5</p>
        <p className="controlPadButton">6</p>
      </div>
      <div className="controlPadRow">
        <p className="controlPadButton">7</p>
        <p className="controlPadButton">8</p>
        <p className="controlPadButton">9</p>
      </div>
      <div className="controlPadRow">
        <p className="controlPadButton">#</p>
        <p className="controlPadButton">0</p>
        <p className="controlPadButton">#</p>
      </div>
      <div className="controlPadRow">
        <p className="controlPadButton">Clear</p>
        <p className="controlPadButton">Confirm</p>
      </div>
    </div>
  )
}

}

export default ControlPad;
