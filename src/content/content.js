const sentenceRegex = /[.!?]+/
const sentenceRegexFIXED = /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|!|;)\s/
const wordRegex = /\s/
const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/
const sentenceJoin = ". "
const wordJoin = " "
var FREQUENCY = 10
var on
var REGEX;
var JOIN;
var language;

const SHORT_LENGTH = 10

//const blacklist = ["the","a","of","it","he","her","him","she","be","to","and","in","that","i","as"]
const blacklist = new Set([
    'the',
    'a',
    'of',
    'it',
    'he','her','him','she',
    'be',
    'to',
    'and',
    'in',
    'that',
    'i',
    'as',
    'so',
    '-'
])

console.log("Starting content.js")

// TODO word save option on clicking our special friends

// TODO Translate all SHORT sentences and some words within a larger sentence - > make it so no two words in sequence get diddled

// MAIN DRIVER
chrome.storage.local.get().then((result) => {
    on = result.onOff
    console.log(result.onOff)
    if (on) {
      language = result.targetLanguage
      FREQUENCY = result.freqValue

      console.log("Target language on load is: ", language)
      console.log("Current mode is: " , result.mode)

        if (result.mode === "sentence") {
          replaceSentence(document.body)
        } else if (result.mode === "hybrid"){
          replaceHybrid(document.body)
        } else {
          replaceWord(document.body)
        }


    } else {
        console.log("Extension is off")
    }
})
 
async function processWord(word2) {
    try {
      const response = await sendMessageToBackground({ word: word2, targetLanguage : language });
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

async function replaceHybrid (element) {
  const paragraphs = element.getElementsByTagName("p")
  for (let para of paragraphs) {
    rawSentences = para.innerText.split(sentenceRegexFIXED)
    //para.innerText = ''
    
    // Sanitizes input without scrubbing non-text goodies -> refactor into each method
    para.childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        child.nodeValue = ""
      }
    })

     rawSentences.forEach(chunk => {
        let span = document.createElement('span')
        span.textContent = chunk + " "
        span.classList.add('chunk')
        para.appendChild(span)
    }) 
  }

  const chunks = document.querySelectorAll('.chunk')

  const processChunks = async () => {
      const promises = Array.from(chunks).map(async (chunk) => {
          chunkWordCount = chunk.innerText.split(" ").length

          //if (chunkWordCount <= SHORT_LENGTH) {
          let random = Math.floor(Math.random() * 101)
          if (random < FREQUENCY) {
              console.log("SHORT SENTENCE FOUND")
              const beforeText = chunk.textContent
              chunk.setAttribute('before', beforeText)
              chunk.textContent = await processWord(chunk.textContent)
              chunk.classList.add("translation")
          } 
          
          else {
              // TODO - NO TWO CONSECUTIVE WORDS
              let words = chunk.innerText.split(wordRegex)
              words = await Promise.all(words.map(async (word) => {
                  let random = Math.floor(Math.random() * 101)
                  // IF BROKEN, CHECK HERE
                  if (random < FREQUENCY && !blacklist.has(word.toLowerCase())) {
                      const newWord = await processWord(word)
                      return ('<span class="translation" before=' + word + '>' + newWord + "</span>")
                  } else {
                      return word
                  }  
          })) 

          words = words.join(' ')
          chunk.innerText = ''
          chunk.innerHTML = words
          } 
      })
    await Promise.all(promises);
    addHighlightsAndPopup();
  }
  
  processChunks()
}

async function replaceSentence (element) {
    const paragraphs = element.getElementsByTagName("p")
   
    for (let para of paragraphs) {
      words = para.innerText.split(sentenceRegexFIXED)
      //words = words.split(REGEX)
      console.log("Split up paragraph looks like: ", words)
      para.innerText = ''

      words.forEach(chunk => {
        let span = document.createElement('span')
        span.textContent = chunk + " "
        span.classList.add('chunk')
        para.appendChild(span)
      })

    }
 
    const chunks = document.querySelectorAll('.chunk')
     /* chunks.forEach(async chunk => {
      let random = Math.floor(Math.random() * 101)
      if (random < FREQUENCY) {
        console.log(random, " was less than ", FREQUENCY, " so this was a hit")
        const beforeText = chunk.textContent
        chunk.textContent = await processWord(chunk.textContent)
        chunk.classList.add('translation')
      }
    }) 


    addHighlightsAndPopup() */
    const processChunks = async () => {
      const promises = Array.from(chunks).map(async (chunk) => {
        let random = Math.floor(Math.random() * 101);
        if (random < FREQUENCY) {
          console.log(random, " was less than ", FREQUENCY, " so this was a hit");
          const beforeText = chunk.textContent;
          chunk.setAttribute('before', beforeText)
          chunk.textContent = await processWord(chunk.textContent);
          chunk.classList.add('translation');
        }
      });
    
      await Promise.all(promises);
      addHighlightsAndPopup();
    }
    processChunks()
  }

// We can refactor this - replace functions just mark necessary elements as what we want, and the 
// one that adds hover class can handle translation - what structure would I need to be able to dynamically update the page?

async function replaceWord(element){
  console.log("Triggered replaceWord")
  // I only need to mark a span around the given words
  const paragraphs = element.getElementsByTagName("p")

  for (let para of paragraphs) { 
    //const originalWords = para.innerText
    words = para.innerText.split(wordRegex)
    words = await Promise.all(words.map(async (word) => {
      let random = Math.floor(Math.random() * 101)
      if (random < FREQUENCY) {
        //const beforeText = word
        const newWord = await processWord(word);
        return ('<span class="translation" before=' +  word +  '>' +  newWord +  "</span>");
      } else {
        return word;
      }
    }))

    words = words.join(' ')
    para.innerHTML = words

    addHighlightsAndPopup()

  }
}

/*
We broke word mode.


May benefit from creating two different functions, one for word and one for sentence
  -> I have a feeling the structure of the two need to be fundamentally different.


NLP can be used to make this work better, potentially - worth looking in to

Right now we eat hyperlinks - let's try to fix that
*/

/*
Putting spans into an existing fella

document.addEventListener("DOMContentLoaded", function() {
    // Select the paragraph element
    const paragraph = document.getElementById('myParagraph');

    // Create a new span element
    const span = document.createElement('span');
    span.textContent = ' HERE ARE TRANSLATED WORDS ';

    // Find the position to insert the span
    const textNode = paragraph.firstChild;
    const insertionPoint = "Example text we're gonna keep going hooooh boy".length;

    // Split the text node at the insertion point
    const beforeText = textNode.textContent.substring(0, insertionPoint);
    const afterText = textNode.textContent.substring(insertionPoint);

    // Create text nodes for the split text
    const beforeTextNode = document.createTextNode(beforeText);
    const afterTextNode = document.createTextNode(afterText);

    // Clear the original paragraph content
    paragraph.textContent = '';

    // Append the nodes in the correct order
    paragraph.appendChild(beforeTextNode);
    paragraph.appendChild(span);
    paragraph.appendChild(afterTextNode);
});
*/

function addHighlightsAndPopup() {
  const translations = document.querySelectorAll('.translation')
  console.log(translations)
  console.log("Triggered highlights and popup")

  translations.forEach( element => {
    if (element.getAttribute('before') == "") {
      element.innerText = ''
      element.innerHTML = ''
    }

    element.addEventListener('mouseover', function(event) {
      console.log("Triggered mouseover")
      let hoverPopup = document.createElement("div")
      hoverPopup.innerText = element.getAttribute("before")
      hoverPopup.classList.add('hoverPopup')

      document.body.appendChild(hoverPopup)

      // Follows the cursor around but get's buggy when it nearly hits the wall
       element.addEventListener('mousemove', function(event) {
        const x = event.clientX
        const y = event.clientY + window.scrollY

        hoverPopup.style.left = (event.clientX + 10) + 'px'
        hoverPopup.style.top = (event.clientY + window.scrollY + 10) + 'px'
    })

    element.addEventListener("mouseout", function(event) {
      console.log("Moused off, baby")
      let existingPopup = document.body.querySelector('.hoverPopup')
      if (existingPopup) {
        existingPopup.remove()
      }
    })
  })

  })
}