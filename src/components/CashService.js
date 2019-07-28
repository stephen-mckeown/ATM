let fivesAtm = 4;
let tensAtm = 15;
let twentiesAtm = 7;

function cashTotal(){
  let total = (fivesAtm * 5) + (tensAtm * 10) + (twentiesAtm * 20);
  return total;
}

function cashout(amount) {
  let five, ten, twenty;

  if(amount >= 100){    // If value over 100 give selection of notes
    if(tensAtm > 0){
      ten = 1
      amount -= 10;
      tensAtm -= 1;
    }
     if(tensAtm > 1){
      five = 2
      amount -= 10;
      fivesAtm -= 2;
    }
  }

  if(amount >= 20 && twentiesAtm > 0){
    twenty = Math.floor(amount / 20);
    if(twenty > twentiesAtm){
      twenty = twentiesAtm;
      twentiesAtm = 0;
      amount = amount - twenty * 20
    } else {
      twentiesAtm -= twenty;
      amount = amount % 20;
    }
  }
   if(amount >= 10){
    ten = Math.floor(amount / 10);
    if(ten > tensAtm){
      ten = tensAtm;
      tensAtm = 0;
      amount = amount - ten * 10
    } else {
    tensAtm -= ten;
    amount = amount % 10;
    }
  }
  if(amount >= 5){
    five = Math.floor(amount / 5);
     if(five > fivesAtm){
      five = fivesAtm;
      fivesAtm = 0;
      amount = amount - five * 5
    } else {
    fivesAtm -= five;
    amount = amount % 5;
    }
  }
return {twenty, ten, five}
}

export default {cashout, cashTotal};