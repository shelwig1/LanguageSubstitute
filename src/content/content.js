var sentenceRegex = /[.!?]+/
var wordRegex = /\s/
var FREQUENCY = 10
var on

// Can I get all these tagged items at once and then only do the request one time?

// Need to send an HTML request to a given URL

/* fetch('http://localhost:3000/')
  .then(response => response.json())
  .then(data => console.log(data))
 */
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
      console.log("Response from background script:", response);
      // Process the response
    } catch (error) {
      console.error("Error:", error);
    }
  }

function sendMessageToBackground(message) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(message, response => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(response);
        }
      });
    });
  }

function replaceText (element) {
    console.log("replaceText function is working")


    const paragraphs = element.getElementsByTagName("p")
    for (let para of paragraphs) {
        words = para.innerText
        words = words.split(wordRegex)

        
        words = words.map( (word) => {
            //Randomly highlight any given word
            let randInt = Math.floor(Math.random() * FREQUENCY) + 1
            if (randInt == 1) {
                // translate the word
                //const newWord = sendMessageToBackground('dog')
                //console.log(newWord)
                const response = processWord("dog")
                console.log(response)
                // Send the word to background

                // Translate it
                // Get it back
                return word.toUpperCase()
            } else {
                return word
            }
        })
        words = words.join(" ")
        para.innerText = words
        }  
    }

function replaceSentences (element) {
    const paragraphs = element.getElementsByTagName("p")

}

// Tutorial find and replace function
    /* if (element.hasChildNodes()) {
        element.childNodes.forEach(replaceText)
    } else if (element.nodeType === Text.TEXT_NODE) {
        element.textContent = element.textContent.replace(/coronavirus/gi, 'REPLACEMENT')
        } */
