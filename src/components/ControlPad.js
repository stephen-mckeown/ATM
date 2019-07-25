import React from 'react';
import './ControlPad.css';
import { fetchPin } from './API.js'


class ControlPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinApprove: false,
      balance: 300,
    };
  }


checkPin() {
  console.log("checkPin")
  return fetchPin('https://frontend-challenge.screencloud-michael.now.sh/api/pin/', {pin:'1111'})
  .then((res)=>
  console.log(res))
}


render (){
  return (
<div>
    <input className="display" type="text" placeholder="Enter PIN" />

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
          <p className="controlPadButton" onClick={() => this.checkPin()}>Confirm</p>
      </div>
    </div>

</div>
  )
}

}

export default ControlPad;
