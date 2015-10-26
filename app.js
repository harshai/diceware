~function(window, document){
  var generateBtn = document.getElementById('generate'),
      codeEl = document.getElementById('generated-pass'),
      wordCount = document.getElementById('wordCount'),
      wordCountOutput = document.getElementById('wordCountOutput'),
      mask = document.getElementById('mask'),
      extraSecurity = document.getElementById('extraSecurity');


  document.generatePasswordForm.addEventListener("change", function(event){
    generatePassword(event);
  }, false)

  generateBtn.addEventListener("click", function(event){
    generatePassword(event)
  }, false);

  codeEl.addEventListener("click", function(event){
   document.queryCommandSupported('copy') && copyToClipboard(this.childNodes[0].nodeValue);
  }, false)

  wordCount.addEventListener("input", function(){
    wordCountOutput.value = wordCount.value;
  }, false)

  mask.addEventListener("transitionend", function(){
    codeEl.classList.remove('copied')
  }, false)

  function generatePassword(event) {
    event && event.preventDefault();
    var password = diceware({
      wordCount: wordCount.value,
      extraSecurity: extraSecurity.checked,
      separator: generatePasswordForm.separator.value
    });

    codeEl.childNodes[0].nodeValue = password;
  }

  function copyToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.id = "dummy-textarea";
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      if(successful){
        codeEl.classList.add('copied');
      }

    } catch (err) {
      console.log(err);
    }

    document.body.removeChild(textArea);
  }


  generatePassword();
}(window, document)