const translate = require('./translate')
const FREQUENCY = 1

words = ["Test","dog","cat","hat","mat"]

words = words.map( async (word) => {
    //Randomly highlight any given word
    let randInt = Math.floor(Math.random() * FREQUENCY) + 1
    if (randInt == 1) {
        const newWord = await translate.translateText(word)                
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

// I want to take all the text from a page, 

// select the words and send them up to get translated in parallel

// When I have the whole block, then we start putting it back in