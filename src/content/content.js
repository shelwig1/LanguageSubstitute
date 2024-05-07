var sentenceRegex = /[.!?]+/
var wordRegex = /\s/
var FREQUENCY = 10
var on

console.log("Starting content.js")


const message = {word : 'testicles'} 
/* chrome.runtime.sendMessage(message, response => {
  console.log("Sent message: " , message)
  console.log("Received the following: ", response)
}) */

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
 

//sendMessageToBackground(message)
//processWord("testicles")

async function processWord(word2) {
    try {
      //console.log("ProcessWord started")
      const response = await sendMessageToBackground({ word: word2 });
      //console.log("ProcessWord received: ",response)
      //console.log("Response from background script:", response);
      return response
      // Process the response
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
          //console.log("Content - sendMessageToBackground - response: ", response)
          resolve(response);
        }
      });
    });
  }   


/* function sendMessageToBackground(message) {
  chrome.runtime.sendMessage(message, response => {
    //console.log("Content - message sent: ", message)
    //console.log("Content - response from background: ", response)
    //const res = response
    console.log("Response was: ", response)
    return response
  })
}
 */

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
                console.log("Content - received word: ", newWord)
                
                // translate the word
                //const newWord = sendMessageToBackground('dog')
                //console.log(newWord)
                //const response = processWord("dog")
                //console.log(response)
                // Send the word to background

                // Translate it
                // Get it back
                return newWord
                //return word.toUpperCase()
            } else {
                return word
            }
        })
        //console.log("Words looks like: ", words)
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
