
const sentenceRegex = /[.!?]+/
const wordRegex = /\s/
let FREQUENCY = 10

// Replacing words vs replacing sentences

replaceText(document.body)

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
            console.log(words)

            
            //console.log(words)
            words = words.join(" ")
            para.innerText = words
            // Rebuilding the sentence as we go

            // Array of words
            /* for (let sentence of text) {
                sentence = sentence.split(wordRegex)

                for (let word of sentence) {
                    word = word.toUpperCase()
                }

            }*/

            }  
        }

function replaceSentences (element) {
    const paragraphs = element.getElementsByTagName("p")

}


/*
I need a big ass array of all the words in every doodad

One out of every 10 words is translated

I want it to be read through and edited on the spot

So I have my paragraphs. Within each paragraph, I need to read the sentence and change the text on the other end.

For every paragraph, get the whole thing. Get the sentence, figure out the Nth word, send it out to translate, return
the next completed paragraph, roll on the weekend, sorted.
*/


// Tutorial find and replace function
    /* if (element.hasChildNodes()) {
        element.childNodes.forEach(replaceText)
    } else if (element.nodeType === Text.TEXT_NODE) {
        element.textContent = element.textContent.replace(/coronavirus/gi, 'REPLACEMENT')
        } */
