export const utils = {
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
            element.textContent = element.textContent.replace(/coronavirus/gi, 'REPLACEMENT')
        }
    }
}

// CALL WITH findReplace(document.body)