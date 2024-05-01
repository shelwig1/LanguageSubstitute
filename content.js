console.log("Content script is working")

replaceText(document.body)

function replaceText (element) {
    if (element.hasChildNodes()) {
        element.childNodes.forEach(replaceText)
    } else if (element.nodeType === Text.TEXT_NODE) {
        element.textContent = element.textContent.replace(/coronavirus/gi, 'REPLACEMENT')
        }
}

/*
    Iterate through the elements of the body.

    Do I want words or sentences? Chunks of words, perhaps

    Need to be able to count words

    Slicing up the DOM by sentence

    Let's do it "if the element is of type paragraph"
*/



/* replaceText(document.body)

function replaceText(element) {
    if (element.hasChildNodes()) {
        console.log("Replace text function working")
    }
}
 */

/* export const utils = {
    test() {
        console.log("Export is working")
    },
    print(data) {
        console.log(data)
    },
    findReplace(element) { 
        if (element.hasChildNodes()) {
            element.childNodes.forEach(replaceText)
        } else if (element.nodeType === Text.TEXT_NODE) {
            // Add the word we want to die and the word we want to add back in
            // add <mark> tag around the words of interest at first -> proof of concept
            
            //element.textContent = element.textContent.replace(/coronavirus/gi, 'REPLACEMENT')
            console.log(element.textContent)
        }
    }
} */

// CALL WITH findReplace(document.body)


