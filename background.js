import {utils} from "./content.js"
const url = chrome.runtime.getURL('freqList.json')
let words;

console.log("Background working")

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        console.log('Refreshed the page')
        utils.print(words)

        for (const i in words) {
            // key -> i
            // value -> words[i]

            // Run the find and replace function with that word
            console.log(words[i])
        }
    }
})

async function fetchData() {
    try{
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error("Network response not okay")
        }
        const data = await response.json()

        console.log("Fetched data", data)
        return data
    } catch (error) {
        console.log("Error fetching data:", error)
    }
}

fetchData()
    .then(data => {
        console.log("Data outisde async function:", data)
        words = data
        console.log("Setting words var to:",words)
    })
    .catch(error => {
        console.error("Error outside async function", error)
    })
