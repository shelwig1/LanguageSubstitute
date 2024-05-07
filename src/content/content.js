var sentenceRegex = /[.!?]+/
var wordRegex = /\s/
var FREQUENCY = 10
var on

console.log("Starting content.js")

// MAIN DRIVER
chrome.storage.local.get().then((result) => {
    on = result.onOff
    console.log(result.onOff)
    if (on) {
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
        words = words.split(wordRegex)

        
        words = words.map( async (word) => {
            //Randomly highlight any given word
            let randInt = Math.floor(Math.random() * FREQUENCY) + 1
            if (randInt == 1) {
                const newWord = await processWord(word)                
                return newWord
                //return word.toUpperCase()
            } else {
                return word
            }
          })
        console.log("Processing done, words: ", words)
        //console.log("Words looks like: ", words)
        //words = words.join(" ")
        //para.innerText = words
        }  
    }

function replaceSentences (element) {
    const paragraphs = element.getElementsByTagName("p")

}
