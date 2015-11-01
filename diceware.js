var diceware = (function() {
  var defaults = {
    separator: " ",
    wordCount: 6,
    extraSecurity: false,
    minLength: 20,
    dictionary: "defaultWordList"
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

  generateRandomWords = function(wordCount, dictionary) {
    var randomArr = generateRandomArray(wordCount * 5, 6),
        wordlist = dicewareDictionaryList[dictionary]

    return (_
      .chain(randomArr)
      .chunk(5)
      .map(function(arr){
        return arr.join('')
      })
      .map(function(key){
        return wordlist[key];
      })
      .value());
  },

  addExtraSecurity = function(dicewarePass) {
    return attachCharToWord(upperCaseRandomWord(dicewarePass));
  },

  upperCaseRandomWord = function(dicewarePass) {
    var wordToCap = dicewarePass[generateRandomArray(1, dicewarePass.length - 1)[0]],
        index = dicewarePass.indexOf(wordToCap);
    dicewarePass.splice(index, 1, wordToCap.toUpperCase());

    return dicewarePass;
  },

  attachCharToWord = function(dicewarePass){
    var randomArr = generateRandomArray(3, 5),
        specialChar = dicewareDictionaryList.extraSecurity[randomArr[0]][randomArr[1]],
        randomWord = dicewarePass[randomArr[2]];

    dicewarePass.splice(randomArr[2], 1, randomWord + specialChar);
    return dicewarePass;
  }

  diceware = function(options) {
    options = _.merge(defaults, options || {});
    var dicewarePass = generateRandomWords(options.wordCount, options.dictionary);

    if(options.extraSecurity) {
      return addExtraSecurity(dicewarePass).join(options.separator);
    }

    return dicewarePass.join(options.separator);
  }

  diceware.calculateEntropy = function(passphrase) {
    return {
      entropy: 1,
      yearsToCrack: 5,
    }
  }

  return diceware;

}());