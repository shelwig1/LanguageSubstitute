var sentenceRegex = /[.!?]+/
var wordRegex = /\s/
var FREQUENCY = 10
var on
var REGEX;
console.log("Starting content.js")

// MAIN DRIVER
chrome.storage.local.get().then((result) => {
    on = result.onOff
    console.log(result.onOff)
    if (on) {
      if (result.mode === "sentence"){
        REGEX = sentenceRegex
      } else {
        REGEX = wordRegex
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
        words = words.join(" ")
        para.innerText = words
    }}
    


