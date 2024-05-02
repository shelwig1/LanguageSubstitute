//import {utils} from "./content.js"
//import {start} from './content.js'


const url = chrome.runtime.getURL('freqList.json')
let words
let freqCutoff
let onOff = true

console.log("Background working")

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    /* if (tab.url?.startsWith("chrome://")) {
        console.log("Starts with chrome, can't do it")
        return undefined;
    } */
    //console.log("Got past the chrome URL")

    if (tab.active && changeInfo.status === 'complete') {
        //console.log('Tried to run other script')
        chrome.scripting.executeScript({
            target: {tabId : tab.id},
            files: ['content.js']
        })
    }

})

// THIS IS BROKEN, PLEASE FIX ASSHOLE
// Handles word frequency getting updated from the UI
chrome.runtime.onMessage.addListener(
    function(request) {
        freqCutoff = request.freqData
        onOff = request.toggleData
        console.log("Recieved event appropriately")
        console.log(onOff)
    }
)

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
