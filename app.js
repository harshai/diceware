~function(window, document){
  var generateBtn = document.getElementById('generate'),
      codeEl = document.getElementById('generated-pass'),
      wordCount = document.getElementById('wordCount'),
      wordCountOutput = document.getElementById('wordCountOutput'),
      mask = document.getElementById('mask');

  generateBtn.addEventListener("click", function(event){
    event.preventDefault();
    var password = diceware({
      wordCount: wordCount.value
    })
    codeEl.childNodes[0].nodeValue = password;
  }, false);

  codeEl.addEventListener("click", function(event){
    copyToClipboard(this.childNodes[0].nodeValue);
  }, false)

  wordCount.addEventListener("input", function(){
    wordCountOutput.value = wordCount.value;
  }, false)

  mask.addEventListener("transitionend", function(){
    codeEl.classList.remove('copied')
  }, false)



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
      } else {
        window.prompt("Copy to clipboard: Ctrl/Cmd + C, Enter", text);
      }

    } catch (err) {
      console.log(err);
    }

    document.body.removeChild(textArea);
  }


  generateBtn.click();
}(window, document)