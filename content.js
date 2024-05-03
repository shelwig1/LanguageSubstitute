var sentenceRegex = /[.!?]+/
var wordRegex = /\s/
var FREQUENCY = 10
var on



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
