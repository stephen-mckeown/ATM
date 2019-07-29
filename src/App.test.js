import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import CashService from './components/CashService.js'
// const {cashout} = require ('./components/CashService.js');
const { expect } = require('chai');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


describe('cashTotal()', function () {
  it("return 310", function () {
    let expected, actual;
    expected = 310 ;
    actual = CashService.cashTotal();
    expect(actual).to.eql(expected)
  });
});

describe('cashout()', function () {
  it("return { twenty: 6, ten: 1, five: 2 }", function () {
    let input, expected, actual;
    input = 140;
    expected = { twenty: 6, ten: 1, five: 2 } ;
    actual = CashService.cashout(input);
    expect(actual).to.eql(expected)
  });
});

describe('cashout()', function () {
  it("return  { twenty: 1, ten: 2, five: 0 }", function () {
    let input, expected, actual;
    input = 40;
    expected =  { twenty: 1, ten: 2, five: 0 } ;
    actual = CashService.cashout(input);
    expect(actual).to.eql(expected)
  });
});

describe('cashout()', function () {
  it("return  { twenty: 0, ten: 9, five: 0 }", function () {
    let input, expected, actual;
    input = 90;
    expected =  { twenty: 0, ten: 9, five: 0 } ;
    actual = CashService.cashout(input);
    expect(actual).to.eql(expected)
  });
});

describe('cashTotal()', function () {
  it("return 40", function () {
    let expected, actual;
    expected = 40 ;
    actual = CashService.cashTotal();
    expect(actual).to.equal(expected)
  });
});