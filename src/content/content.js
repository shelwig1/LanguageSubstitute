var sentenceRegex = /[.!?]+/
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
        REGEX = sentenceRegex
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

      /*
          let span = document.createElement('span')
              span.className = 'translation'
              span.textContent = newWord

    */

    // We can add newlines if we're doing sentences around em for Arabic

    // Hover on an individual

    // Iterating through every HTML element, rather than just the paragraphs
    /* if (element.hasChildNodes() {
      element.childNodes.forEach(replaceText)
    } else if (element.nodeType === Text.TEXT_NODE) {
      element.textContent = element.textContent.replace(textToReplace)
    } */

    //console.log("replaceText function is working")

    /* We have fuck ups with:
      -replacing ? ! . when we rebuild everything
      -current implementation kills all cool little things like hyperlinks and shit

    */
     const paragraphs = element.getElementsByTagName("p")
   
    for (let para of paragraphs) {
      words = para.innerText
      words = words.split(REGEX)
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

 
  /*     let randInt = Math.floor(Math.random() * FREQUENCY) + 1;
      if (randInt == 1) {
        console.log("Hit the jackpot baby")
        //chunk.textContent = await processWord(chunk.textContent)
      } */

 /* 
    for (let para of paragraphs) {
        words = para.innerText
        words = words.split(REGEX)
        words = await Promise.all(words.map(async (word) => {

          // All of them need to be wrapped into a span

          // Create the span, wrap the sentence with it.

          // If it gets translated, add the class to it to make it a translation

          /* let randInt = Math.floor(Math.random() * FREQUENCY) + 1;
          if (randInt == 1) {
 
          let random = Math.floor(Math.random() * 101)
          if (random < FREQUENCY) {
              console.log("HIT")
              const newWord = await processWord(word);
              return newWord;
          } else {
              return word;
          }
      }))
        words = words.join(JOIN)
        para.innerText = words
    }}
   
 */

