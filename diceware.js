var diceware = (function() {
  var defaults = {
    separator: " ",
    wordCount: 6,
    extraSecurity: false,
    minLength: 20
  }


  var generateRandomArray = function(length, range) {
    var randomArr = new Uint32Array(length),
        temp = [];
    (window.crypto || window.mscrypto).getRandomValues(randomArr);

    temp = _.map(randomArr, function(num){
      return (num % range) + 1;
    });

    return temp;
  },

  generateRandomWords = function(wordCount) {
    var randomArr = generateRandomArray(wordCount * 5, 6)

    return (_
      .chain(randomArr)
      .chunk(5)
      .map(function(arr){
        return arr.join('')
      })
      .map(function(key){
        return dicewareWordlist[key];
      })
      .value());
  },

  addExtraSecurity = function(dicewarePass, separator) {
    upperCaseRandomWord(dicewarePass);
    attachCharToWord(dicewarePass);
    return dicewarePass.join(separator);
  },

  upperCaseRandomWord = function(dicewarePass) {
    var wordToCap = dicewarePass[generateRandomArray(1, dicewarePass.length - 1)[0]],
        index = dicewarePass.indexOf(wordToCap);
    dicewarePass.splice(index, 1, wordToCap.toUpperCase());

    return dicewarePass;
  },

  attachCharToWord = function(dicewarePass){
    var randomArr = generateRandomArray(3, 5),
        specialChar = extraSecurity[randomArr[0]][randomArr[1]],
        randomWord = dicewarePass[randomArr[2]];

    dicewarePass.splice(randomArr[2], 1, randomWord + specialChar);
    return dicewarePass;
  }

  diceware = function(options) {
    options = _.merge(defaults, options || {});
    var dicewarePass = generateRandomWords(options.wordCount);

    if(options.extraSecurity) {
      return addExtraSecurity(dicewarePass, options.separator);
    }

    return dicewarePass.join(options.separator);
  }

  return diceware;

}());