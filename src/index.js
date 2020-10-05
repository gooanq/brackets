'use strict'
module.exports = check;

function check(str, bracketsConfig) {
  let openSymbol = [];
  let closeSymbol = [];
  bracketsConfig.forEach(element => {
    openSymbol.push(element[0]);
    closeSymbol.push(element[1]);
  });

  let symbolsCheck = [];

  LOOP:
  for (let i = 0; i < str.length; i++) {
    if (openSymbol.indexOf(str[i]) !== -1 && closeSymbol.indexOf(str[i]) !== -1) {
      for (let j = i - 1; j > -1; j--) {
        if (symbolsCheck[j].indexSymbol === closeSymbol.indexOf(str[i]) &&
          symbolsCheck[j].closed === false) {

          symbolsCheck[j].closed = true;
          symbolsCheck.push({
            indexSymbol: closeSymbol.indexOf(str[i]),
            closed: true,
          });

          for (let k = j; k <= i; k++) {
            if (symbolsCheck[k].closed === false) {
              return false;
            }
          }
          continue LOOP;
        }
      }
      symbolsCheck.push({
        indexSymbol: openSymbol.indexOf(str[i]),
        closed: false
      })
    }
    
    else if (openSymbol.indexOf(str[i]) !== -1) {
      symbolsCheck.push({
        indexSymbol: openSymbol.indexOf(str[i]),
        closed: false
      })
    }

    else if (closeSymbol.indexOf(str[i]) !== -1) {
      for (let j = i - 1; j > -1; j--) {
        if (symbolsCheck[j].indexSymbol === closeSymbol.indexOf(str[i]) &&
          symbolsCheck[j].closed === false
        ) {
          symbolsCheck[j].closed = true;
          symbolsCheck.push({
            indexSymbol: closeSymbol.indexOf(str[i]),
            closed: true,
          });

          for (let k = j; k <= i; k++) {
            if (symbolsCheck[k].closed === false) {
              return false;
            }
          }
          continue LOOP;
        }
      }

      return false;
    }
  }

  for (const element of symbolsCheck) {
    if (element.closed === false) {
      return false;
    }
  };

  return true;
}
