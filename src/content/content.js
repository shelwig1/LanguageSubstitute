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
        FREQUENCY = 100 / result.freqValue
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
    // Iterating through every HTML element, rather than just the paragraphs
    /* if (element.hasChildNodes() {
      element.childNodes.forEach(replaceText)
    } else if (element.nodeType === Text.TEXT_NODE) {
      element.textContent = element.textContent.replace(textToReplace)
    } */

    //console.log("replaceText function is working")
    const paragraphs = element.getElementsByTagName("p")
    for (let para of paragraphs) {
        words = para.innerText
        words = words.split(REGEX)
        words = await Promise.all(words.map(async (word) => {
          let randInt = Math.floor(Math.random() * FREQUENCY) + 1;
          if (randInt == 1) {
              const newWord = await processWord(word);
              return newWord;
          } else {
              return word;
          }
      }))
        //console.log("ChatGPT code: ", words)
        words = words.join(JOIN)
        para.innerText = words
    }}
    


