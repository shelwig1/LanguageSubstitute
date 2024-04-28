
/* if (freqList.length == 0) {
    loadFreqWords(freqFile)
} */

console.log(JSON.parse(freqFile))
    

loadFreqWords(freqFile)

replaceText(document.body)


function replaceText(element) {
    if (element.hasChildNodes()) {
        element.childNodes.forEach(replaceText)
    } else if (element.nodeType === Text.TEXT_NODE) {
        element.textContent = element.textContent.replace(/coronavirus/gi, 'ASSHOLE')
    }
}

/*
Highlighting words we replaced
Checking each word to see if it's in our frequency tables

// Lets get an english frequency table, highlight any of them that show up in that list.

Find and replace any word of interest with:
coolWord = word of interest
find and replace coolWord with <mark>coolWorld</mark>
*/

