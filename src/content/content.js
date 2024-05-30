var sentenceRegex = /[.!?]+/
var sentenceRegexFIXED = /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|!|;)\s/
var wordRegex = /\s/
var sentenceJoin = ". "
var wordJoin = " "
var FREQUENCY = 10
var on
var REGEX;
var JOIN;
console.log("Starting content.js")

// MAIN DRIVER
chrome.storage.local.get().then((result) => {
    on = result.onOff
    console.log(result.onOff)
    if (on) {
      if (result.mode === "sentence"){
        REGEX = sentenceRegexFIXED
        JOIN = sentenceJoin
      } else {
        REGEX = wordRegex
        JOIN = wordJoin
      }
        //FREQUENCY = 100 / result.freqValue
        FREQUENCY = result.freqValue
        console.log("Ran extension")
        replaceText(document.body)
    } else {
        console.log("Extension is off")
    }
})
 
async function processWord(word2) {
    try {
      const response = await sendMessageToBackground({ word: word2 });
      return response
    } catch (error) {
      console.error("Error:", error);
    }
  }

function sendMessageToBackground(message) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(message, response => {
        if (chrome.runtime.lastError) {
          console.log("CHROME MESSAGE ERROR")
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(response);
        }
      });
    });
  }   

async function replaceText (element) {
    const paragraphs = element.getElementsByTagName("p")
   
    for (let para of paragraphs) {
      words = para.innerText
      words = words.split(REGEX)
      console.log("Split up paragraph looks like: ", words)
      para.innerText = ''

      words.forEach(chunk => {
        let span = document.createElement('span')
        span.textContent = chunk
        span.classList.add('chunk')
        para.appendChild(span)
      })

    }
 
    const chunks = document.querySelectorAll('.chunk')
    chunks.forEach(async chunk => {
      let random = Math.floor(Math.random() * 101)
      if (random < FREQUENCY) {
        console.log(random, " was less than ", FREQUENCY, " so this was a hit")
        const beforeText = chunk.textContent
        chunk.textContent = await processWord(chunk.textContent)

        chunk.addEventListener('mouseover', function(event) {
          let hoverPopup = document.createElement("div")
          hoverPopup.innerText = beforeText
          hoverPopup.classList.add('hoverPopup')
          chunk.appendChild(hoverPopup)          
        })

        chunk.addEventListener("mouseout", function(event) {
          console.log("Moused off, baby")
          let existingPopup = chunk.querySelector('.hoverPopup')
          if (existingPopup) {
            existingPopup.remove()
          }
        })
      }
    }) 
  }

/*
We broke word mode.


May benefit from creating two different functions, one for word and one for sentence
  -> I have a feeling the structure of the two need to be fundamentally different.


NLP can be used to make this work better, potentially - worth looking in to

Right now we eat hyperlinks - let's try to fix that
*/