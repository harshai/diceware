var diceware = (function() {
  var defaults = {
    separator: " ",
    wordCount: 6,
    extraSecurity: false,
    minLength: 20
  }


  var generateRandomWords = function(wordCount){
    var diceThrowCount = wordCount * 5,
        randomArray = new Uint32Array(diceThrowCount);

    (window.crypto || window.mscrypto).getRandomValues(randomArray);

    return (_
      .chain(randomArray)
      .map(function(num){
        return num % 5 + 1;
      })
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
    var randomArray = new Uint32Array(7),
        temp = [];

    (window.crypto || window.mscrypto).getRandomValues(randomArray);

    temp = _.map(randomArray, function(num){
      return num % 8 + 1;
    });
    var word1 = dicewarePass[temp[0] % dicewarePass.length];
    dicewarePass[temp[0]] = word1.substr(0, temp[1] % word1.length) + extraSecurity[temp[2] % 6][temp[3] % 6] + word1.substr(temp[1] % word1.length + 1);

    var word2 = dicewarePass[temp[4] % dicewarePass.length];
    dicewarePass[temp[4]] = word2.substr(0, temp[5] % word2.length) + word2.charAt(temp[5] % 6 + 1).toUpperCase() + word2.substr(temp[5] % word2.length + 1);

    console.log(extraSecurity[temp[2] % 6][temp[3] % 6], word2.charAt(temp[5] % 6 + 1).toUpperCase())
    return dicewarePass.join(separator)
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

}())

console.log(diceware({
  wordCount: 6,
  extraSecurity: false
}));